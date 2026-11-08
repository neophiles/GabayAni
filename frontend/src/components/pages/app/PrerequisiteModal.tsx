import Button from "../../common/Button";
import Text from "../../common/Text";
import Modal from "../../common/Modal";
import { BookOpen, CircleExclamationPoint, Mail, MessagesCircle, Phone } from "lucide-react";
import Icon from "../../common/Icon";
import useModal from "../../../stores/modal";

export default function PrerequisiteModal() {
  const { closeModal } = useModal()

  return (
    <Modal>
      <div className="flex items-end justify-center gap-2 text-info">
        <Icon icon={CircleExclamationPoint} /> 
        <Text as="h2" size="lg">
          Important Reminder
        </Text>
      </div>
      
      <div className="flex flex-col gap-2">
        <Text as="h3">
          UPLB-ASI Soil Test Kit Required
        </Text>
        <Text>
          It is a portable tool developed by the University of the Philippines Los Baños - Agricultural Systems Institute for rapid, on-site soil testing. This app requires visual results from this kit to work accurately.
        </Text>
      </div>

      <div className="flex flex-col gap-2">
        <Text as="h3">
          Need a kit?
        </Text>
        <Text>
          Contact the UPLB Division of Soil Science - Analytical Services Laboratory (DSS-ASL):
        </Text>
        <div className="flex flex-col gap-1 text-sm text-primary">
          <a
            href="https://asi.cafs.uplb.edu.ph/soil-test-kit/"
            className="flex items-center gap-2 font-medium hover:underline"
          >
            <Icon icon={BookOpen} className="size-4" />
            <Text>Learn more about the STK</Text>
          </a>
          <a
            href="tel:09673991640"
            className="flex items-center gap-2 font-medium hover:underline"
          >
            <Icon icon={Phone} className="size-4" />
            <Text>0967 399 1640</Text>
          </a>
          <a
            href="mailto:stk_dss-asi.uplb@up.edu.ph"
            className="flex items-center gap-2 font-medium hover:underline break-all"
          >
            <Icon icon={Mail} className="size-4" />
            <Text>stk_dss-asi.uplb@up.edu.ph</Text>
          </a>
          <a
            href="https://www.facebook.com/uplbasi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium hover:underline break-all"
          >
            <Icon icon={MessagesCircle} className="size-4" />
            <Text>
              facebook.com/uplbasi
            </Text>
          </a>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <Text as="h3">Tutorial Video</Text>
        <iframe
          src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fuplbasi%2Fvideos%2F321929285549701%2F&show_text=false&width=560&t=0"
          className=" aspect-video border-0 overflow-hidden"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>

      <div className="flex">
        <Button
          onClick={() => window.open('https://www.facebook.com/uplbasi', '_blank')}
          className="flex-1 p-2 px-4"
        >
          <Text className="font-medium">I don't have one</Text>
        </Button>
        <Button
          onClick={closeModal}
          className="flex-1 p-2 px-4 bg-primary text-primary-content rounded-lg"
        >
          <Text className="font-medium">I have it</Text>
        </Button>
      </div>
    </Modal>
  )
}
