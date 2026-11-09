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
      <Spinner />
      <Text as="h1" size="2xl">
        Analyzing your farm...
      </Text>
      <Text className="text-base-content-muted">
        Please wait while we prepare your recommendations.
      </Text>
    </Page>
  );
}
