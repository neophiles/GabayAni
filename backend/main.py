from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from sqlmodel import select
from sqlalchemy.orm import joinedload
from app.database import create_db_and_tables, SessionDep
from app.models import Input, InputRead, PredictionRequest
from app.predictor import predict_crop
from app.optimizer import generate_crop_optimization
from app.lookup_tables import CROP_NPK_TARGETS

app = FastAPI()

allowed_origin = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
  CORSMiddleware,
  allow_origins=[allowed_origin],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
  create_db_and_tables()

@app.get("/")
def root():
  return {
    "message": "Welcome to Crop Classifier"
  }

@app.get("/health")
def health():
  return {
    "status": "ok"
  }

@app.post("/predict", response_model=InputRead)
def predict(input_data: PredictionRequest, session: SessionDep) -> InputRead:
  if input_data.nitrogen_level is not None:
    classifier_npk = {
      nutrient: sum(targets[nutrient] for targets in CROP_NPK_TARGETS.values()) / len(CROP_NPK_TARGETS)
      for nutrient in ("N", "P", "K")
    }
    input = Input(
      nitrogen=classifier_npk["N"],
      phosphorus=classifier_npk["P"],
      potassium=classifier_npk["K"],
      temperature_c=input_data.temperature_c,
      humidity_percent=input_data.humidity_percent,
      ph=input_data.ph,
      rainfall_mm=input_data.rainfall_mm,
      area_ha=input_data.area_ha,
    )
  else:
    input = Input(
      nitrogen=input_data.nitrogen,
      phosphorus=input_data.phosphorus,
      potassium=input_data.potassium,
      temperature_c=input_data.temperature_c,
      humidity_percent=input_data.humidity_percent,
      ph=input_data.ph,
      rainfall_mm=input_data.rainfall_mm,
      area_ha=input_data.area_ha,
    )

  predicted_crop_label = predict_crop(input)

  if input_data.nitrogen_level is not None:
    stk_levels = {
        "N": input_data.nitrogen_level,
        "P": input_data.phosphorus_level,
        "K": input_data.potassium_level
    }
    output_metrics = generate_crop_optimization(input, predicted_crop_label, stk_levels)
  else:
    # Fallback if tested without STK levels in Swagger UI
    fallback_stk = {"N": "Medium", "P": "Medium", "K": "Medium"}
    output_metrics = generate_crop_optimization(input, predicted_crop_label, fallback_stk)

  input.output = output_metrics
  session.add(input)
  session.commit()
  session.refresh(input)
  
  return input

@app.get("/predictions", response_model=list[InputRead])
def get_predictions(session: SessionDep) -> list[InputRead]:
  statement = select(Input).options(joinedload(Input.output))
  predictions = session.exec(statement).all()
  return predictions