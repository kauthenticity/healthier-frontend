import Layout from "src/components/layout";
import MainHeader from "src/components/mainHeader";
import NavigationBar from "src/components/navigationBar";
import Advertisement from "./advertisement";
import Challenges from "./challenges";
import DiagnosisHistory from "./diagnosis-history";
import Hospitals from "./hospitals";
import Symptoms from "./symptoms";

function Main() {
  return (
    <>
      <MainHeader />
      <Layout padding="5.6rem 0 12rem">
        <Advertisement />
        <Symptoms />
        <Hospitals />
        <Challenges />
        <DiagnosisHistory />
      </Layout>
      <NavigationBar menu="home" />
    </>
  );
}

export default Main;
