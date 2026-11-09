import { useEffect } from "react";
import Page from "../../common/Page";
import Spinner from "../../common/Spinner";
import Text from "../../common/Text";

export default function LoadingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Page className="min-h-[60vh] items-center justify-center text-center">
      <Spinner className="size-16 text-[#D98308]" />
      <Text as="h1" size="2xl" className="text-primary">
        Analyzing...
      </Text>
    </Page>
  );
}
