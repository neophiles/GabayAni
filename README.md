# GabayAni

## Overview

**GabayAni** is a lightweight, mobile-first web application designed to serve as a decision support system for **local Filipino farmers within CALABARZON**. By integrating real-time weather data, machine learning crop classification, and linear programming cost optimization, the platform transforms on-site soil readings into highly accurate, cost-minimized crop and fertilizer recommendations.

The application features a responsive frontend built with React and Tailwind CSS, and a robust FastAPI backend that dynamically calculates agronomic data to maximize farmer yield and net profit.

## Our Novelty and Challenge

Traditional soil testing requires farmers to send soil samples to regional laboratory facilities, which often involves weeks of waiting and expensive equipment to yield exact quantitative NPK values.

To make soil testing accessible, GabayAni utilizes the **University of the Philippines Agricultural Systems Institute Soil Test Kit (UPLB-ASI STK)**, a rapid, highly practical, and portable colorimetric tool designed for on-site analysis. Instead of digital quantitative outputs, the STK uses specific chemical reagents (like Bromothymol Blue, Chlorophenol Red, and Bromocresol Green) that react with the soil to produce color-coded, qualitative results: **Low, Medium, and High** for Nitrogen (N), Phosphorus (P), and Potassium (K).

**The Challenge:** Machine learning models and linear programming algorithms require exact quantitative values (kg/ha) to optimize costs and predict yields. Our primary engineering and agronomic challenge was bridging this gap: converting qualitative, color-based visual inputs from the STK into reliable, quantitative mathematical data without losing agronomic accuracy.

## How We Calculated the Deficit NPK

To solve the qualitative-to-quantitative challenge, our team engineered a dynamic deficit calculation system based on standard agricultural extension practices and researched lookup tables.

1.  **Crop-Specific Targets:** We compiled a matrix of baseline NPK target requirements (in kg/ha) for various crops (e.g., Rice, Maize, Sugarcane) based on agricultural guidelines.
2.  **Agronomic Multipliers:** We translated the STK's qualitative labels into quantitative multiplier percentages to determine the exact nutrient deficit of the soil:
    - **Low (100% / 1.0):** The soil is highly deficient. The farmer must supply 100% of the crop's baseline NPK requirement.
    - **Medium (50% / 0.5):** The soil contains an average amount of nutrients. The farmer only needs to supply approximately 50% of the crop's total requirement.
    - **High (0% / 0.0):** The soil is naturally rich in this nutrient, requiring 0% added fertilizer (effectively zeroing out the deficit, avoiding toxic over-fertilization and saving the farmer money).
3.  **Optimization:** These dynamically calculated deficits are then fed into our backend SciPy Linear Programming (`scipy.optimize.linprog`) algorithm. The system evaluates the deficits against the current market prices and NPK ratios of standard fertilizers (Urea, DAP, MOP) to generate a customized, cost-minimized fertilizer blend.

## Tech Stack

- **Frontend:** React 19 (TypeScript, Vite), Tailwind 4,
- **Backend:** FastAPI, Python, SQLModel, Uvicorn
- **Data:** NumPy, Pandas, Matplotlib, Seaborn
- **Machine Learning:** NumPy, Pandas, Scikit-learn
- **Data:** Tabular soil chemistry and weather records (`indonesia_dataset.csv`)

---

## Project Structure

```text
crop-classifier/
├── backend/                                  # FastAPI REST API
│   ├── app/                                  # App components and services
│   ├── main.py                               # App root
│   ├── pyproject.toml
│   └── requirements.txt
├── frontend/                                 # React + Vite client
│   ├── src/                                  # UI components and functionalities
│   └── package.json
├── model/                                    # ML classification models
│   ├── random_forest.pkl                     # Final model
│   └── requirements.txt
├── notebooks/                                # EDA and model benchmarking
│   ├── data/                                 # Dataset files
│   ├── EDA.ipynb
│   └── model_trained_on_chosen_crops.ipynb   # Model training notebook
└── README.md
```

---

## Getting Started

### Prerequisites

- [Python 3.x](https://www.python.org/downloads/)
- [uv](https://docs.astral.sh/uv/getting-started/installation/#standalone-installer)
- [Node.js, npm](https://nodejs.org/en/download)

---

### 1. Backend Setup

From the root directory:

```bash
# Navigate to the backend directory
cd backend

# Sync uv environment and dependencies
uv sync

# Run virtual environment if not already
source .venv/Scripts/activate # Git Bash
.venv\Scripts\Activate.ps1 # Powershell

# Start the FastAPI dev server
uv run fastapi dev
```

API: `http://127.0.0.1:8000`.  
Docs: `http://127.0.0.1:8000/docs`.

---

### 2. Frontend Setup

In a new terminal window:

```bash
# Navigate to the frontend directory
cd frontend

# Install packages
npm i

# Start the Vite dev server
npm run dev
```

Client: `http://localhost:5173`.

---

## Environmental Parameters Used

| Parameter       | Description                        | Source                     |
| :-------------- | :--------------------------------- | :------------------------- |
| **N**           | Nitrogen content in soil           | UPLB-ASI STK Results Input |
| **P**           | Phosphorus content in soil         | UPLB-ASI STK Results       |
| **K**           | Potassium content in soil          | UPLB-ASI STK Results       |
| **pH**          | Soil pH level (acidity/alkalinity) | UPLB-ASI STK Results       |
| **Temperature** | Local temperature (°C)             | OpenMeteo Weather API      |
| **Humidity**    | Relative air humidity (%)          | OpenMeteo Weather API      |
| **Rainfall**    | Seasonal precipitation (mm)        | OpenMeteo Weather API      |
| **Area**        | Total size of land (ha)            | Manual Input               |

## Team

| Name             | Role                 |
| ---------------- | -------------------- |
| Vincent Aguirre  | Project Lead         |
| RM Villa         | Data Scientist       |
| Neil Tagle       | Full-Stack Developer |
| Jhon-Jhon Ortiz  | UI/UX Designer       |
| Kyla Dequito     | Researcher           |
| Ace Gamitin      | Researcher           |
| Kim Martinez     | Researcher           |
| Lester Altamira  | Researcher           |
| Kenshin Hirota   | Researcher           |
| Gwen Merano      | Researcher           |
| Eleiza Sarmiento | Researcher           |
