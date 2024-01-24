import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import {
  CREATEREPORT,
  CREATE_INTENT,
  LOGGEDINUSER,
  PAY_MAIL,
  UPGRADE,
} from "../config/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useStripe } from "@stripe/stripe-react-native";

export default function Homepage({ navigation }) {
  // stripe
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  // store
  const { removeTokenLogin } = useContext(LoginContext);
  // LAZY get loggedin
  const [
    funcLoggedIn,
    { data: loggedInData, loading: loggedInLoading, client: loggedInClient },
  ] = useLazyQuery(LOGGEDINUSER, {
    onCompleted: () => {
      console.log("Home page -> onCompleted QueryLOGGEDINUSER", loggedInData);
    },
    refetchQueries: [LOGGEDINUSER],
  });
  useEffect(() => {
    funcLoggedIn();
  }, []);
  // press -> stripe
  const stripe = () => {
    MutateIntent({
      variables: {
        payload: {
          amount: 300,
        },
      },
    });
  };
  // stripe mutation
  const [
    MutateIntent,
    { data: StripeData, loading: StripeLoading, error: StripeError },
  ] = useMutation(CREATE_INTENT, {
    onCompleted: async () => {
      console.log(
        "ReportDetail page -> onCompleted MutationCREATE_INTENT",
        StripeData
      );
      const initResponse = await initPaymentSheet({
        merchantDisplayName: "test.dev",
        paymentIntentClientSecret: StripeData.createIntent.paymentIntent,
      });
      if (initResponse.error) {
        console.log(initResponse.error);
        return;
      }
      await presentPaymentSheet(); // wait here until user click pay or cancel
      // send mail
      MutatePayMail({
        variables: {
          payload: {
            amountPaid: 300,
          },
        },
      });
    },
    onError: async (res) => {
      console.log("Pay Screen -> MutateIntent onError", res);
    },
  });
  const [MutatePayMail, { data: PayMailRes }] = useMutation(PAY_MAIL, {
    onCompleted: () => {
      console.log(
        "ReportDetail page -> onCompleted MutationPAY_MAIL",
        PayMailRes
      );
      MutateUpgrade();
    },
    refetchQueries: [LOGGEDINUSER],
  });
  // press -> Logout
  const handleLogout = async () => {
    console.log(
      "Home page -> logout removeTokenLogin + RESET loggedInClient CACHE"
    );
    loggedInClient.clearStore(); // forget LOGGEDINUSER when logging out
    await removeTokenLogin();
  };
  const [MutateReport, { data: AddReportResponse }] = useMutation(
    CREATEREPORT,
    {
      onCompleted: async () => {
        console.log(
          "Home page -> onCompleted MutateCREATEREPORT",
          AddReportResponse
        );
        // kick
        navigation.navigate("Reports", {
          screen: "ReportDetail",
          params: { reportId: AddReportResponse.createReport._id },
        });
      },
    }
  );
  const [MutateUpgrade, { data: UpgradeData }] = useMutation(UPGRADE, {
    onCompleted: () => {
      console.log(
        "ReportDetail page -> onCompleted MutationUPGRADE",
        UpgradeData
      );
    },
    refetchQueries: [LOGGEDINUSER],
  });
  // press -> createReport
  const createReport = (ownerId, appointment) => {
    MutateReport({
      variables: {
        payload: {
          ownerId,
          appointment,
        },
      },
    });
  };
  if (loggedInLoading) {
    return <Text>Loading</Text>;
  }
  // render
  return (
    <ScrollView style={styles.background}>
      {/* header */}

      <View style={styles.header}>
        {/* text con */}
        <View style={styles.headerTextCon}>
          {/* user name */}
          {loggedInLoading ? (
            <Text style={styles.headerTextName}>Loading...</Text>
          ) : (
            <>
              <Text style={styles.headerTextName}>
                Hi {loggedInData?.loggedIn.username}!
              </Text>
            </>
          )}
          {/* welcome msg */}
          <Text style={styles.headerTextWelcome}>
            Welcome to{"  "}
            <Text style={styles.headerTextWelcome2}>Hemo Insight</Text>{" "}
          </Text>
        </View>
        {/* logo */}
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://media.discordapp.net/attachments/1156408374720737322/1197503175687688273/logo3.png?ex=65bb80bd&is=65a90bbd&hm=2830bca092551756d808d947401d7ff14014ba3e7d43d832d8a546ef0e598c0d&",
          }}
        />
      </View>

      {/* page root con */}
      <View style={styles.con}>
        {/* logged in profile card */}
        <View style={styles.profileCard}>
          {loggedInLoading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              {/* user text data */}
              <View style={styles.profileCardTopSection}>
                {/* logged in user img */}
                <Image
                  style={styles.profileCardTopSectionImage}
                  source={{
                    uri: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-774909.jpg&fm=jpg",
                  }}
                />
                {/* logged in user text data con */}
                <View style={styles.profileCardTopSectionTextCon}>
                  {/* username */}
                  <Text style={styles.profileCardTopSectionUsername}>
                    {loggedInData?.loggedIn.username}
                  </Text>
                  {/* <Text>Email: {loggedInData?.loggedIn.email}</Text> */}
                  {/* <Text>Birth Date: {loggedInData?.loggedIn.birthdate}</Text> */}
                  {/* <Text>Weight: {loggedInData?.loggedIn.weight}</Text> */}
                  {/* <Text>Height: {loggedInData?.loggedIn.height}</Text> */}
                  {/* <Text>Address: {loggedInData?.loggedIn.address}</Text> */}
                  {/* status */}
                  <Text style={styles.profileCardTopSectionStatus}>
                    Status: {loggedInData?.loggedIn.status}
                  </Text>
                  {/* commorbidity */}
                  <Text style={styles.profileCardTopSectionCommorbidity}>
                    Commorbidity: {loggedInData?.loggedIn.commorbidity}
                  </Text>
                  {/* dot text con */}
                  <View style={styles.profileCardTopSectionDataCon}>
                    {/*  weight */}
                    <View style={styles.profileCardTopSectionDataValueCon}>
                      {/* dot */}
                      <View style={styles.profileCardTopSectionDataDot}></View>
                      {/* value */}
                      <Text>Weight: {loggedInData?.loggedIn.weight}</Text>
                    </View>
                    {/*  weight */}
                    <View style={styles.profileCardTopSectionDataValueCon}>
                      {/* dot */}
                      <View style={styles.profileCardTopSectionDataDot}></View>
                      {/* value */}
                      <Text>Height: {loggedInData?.loggedIn.height}</Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* createReport buttons con */}

              {loggedInData?.loggedIn.status == "Premium" ? (
                <View style={styles.profileCardTopSectionButtonCon}>
                  {/* onSite */}
                  <View style={styles.premiumTag}>
                    <Text style={styles.buttonTextPremium}>Premium</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.profileCardTopSectionButtonCon}>
                  {/* onSite */}
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Regular</Text>
                  </View>
                </View>
              )}
            </>
          )}
        </View>
        {/* banner */}
        {loggedInData?.loggedIn.status !== "Premium" ? (
          <>
            <View style={styles.bannerCard}>
              {/* logged in user img */}
              <Image
                style={styles.bannerCardImage}
                source={{
                  uri: "https://picsum.photos/id/89/800/300",
                }}
              />

              {/* card body */}
              <View style={styles.bannerCardBody}>
                {/* title */}
                <Text style={styles.bannerCardBodyTitle}>
                  Subscribe Today for Personalized Insights
                </Text>
                {/* content */}
                <Text style={styles.bannerCardBodyContent}>
                  Supercharge Your Wellness Journey! Subscribe Now for a 10%
                  Discount on All Services.
                </Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  width: 410,
                  borderRadius: 10,
                  height: 250,
                  margin: 3,
                  borderWidth: 2,
                  borderColor: "#59BB85",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    padding: 12,
                  }}
                >
                  Don't Miss Out – Act Now for a Healthier, Happier You!
                </Text>
                <View
                  style={{
                    width: 380,
                    borderRadius: 10,
                    height: 140,
                    margin: 3,
                    borderWidth: 2,
                    borderColor: "#59BB85",
                    backgroundColor: "#59BB85",
                    alignContent: "center",
                    marginLeft: 10,
                  }}
                >
                  <Pressable onPress={stripe} style={styles.style}>
                    <View style={{ margin: 12, gap: 10 }}>
                      <Text style={styles.buttonText}>
                        $79,00 Annual Subscription Fee
                      </Text>
                      <Text style={styles.bannerCardBodyTitle2}>
                        Enjoy all year 10% discount from all services available.
                      </Text>
                      <View>
                        <Text style={styles.buttonText}>Subscribe Now!</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}

        <View style={styles.logoutButtonCon}>
          {/* logout */}
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
        {/* loggedInData?.loggedIn.status */}
        {/* sebscription */}
        {/* create nme a button that has a callback func here if the loggedInData?.loggedIn.status is "Regular" */}
        {/* {loggedInData?.loggedIn.status === "Regular" && (
                    <Pressable style={styles.button} onPress={stripe}>
                        <Text style={styles.buttonText}>Pay Subscription</Text>
                    </Pressable>
                )} */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#eeeeee",
  },
  header: {
    backgroundColor: "#59BB85",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingTop: 40,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    height: 200,
    paddingHorizontal: 25,
  },
  header2: {
    backgroundColor: "#59BB85",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingTop: 40,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    height: 200,
    paddingHorizontal: 25,
  },
  headerTextCon: {
    flexDirection: "column",
  },
  headerTextName: {
    color: "white",
    fontWeight: "400",
    marginBottom: 6,
  },
  headerTextWelcome: {
    color: "white",
    fontWeight: "800",
    fontSize: 20,
  },
  headerTextWelcome2: {
    color: "darkred",
    fontWeight: "800",
    fontSize: 20,
  },

  whiteText: {
    color: "white",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  con: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  profileCard: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  profileCardTopSection: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  profileCardTopSectionImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
  profileCardTopSectionTextCon: {
    flexDirection: "collumn",
    paddingLeft: 16,
  },
  profileCardTopSectionUsername: {
    fontSize: 24,
    fontWeight: "700",
  },
  profileCardTopSectionStatus: {
    fontWeight: "500",
    color: "#59BB85",
  },
  profileCardTopSectionCommorbidity: {
    marginTop: 4,
  },
  profileCardTopSectionDataCon: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  profileCardTopSectionDataValueCon: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileCardTopSectionDataDot: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: "#59BB85",
    marginRight: 4,
  },
  profileCardTopSectionButtonCon: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 6,
    marginTop: 12,
  },
  button: {
    backgroundColor: "#59BB85",
    // width: "100%",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  premiumTag: {
    backgroundColor: "#59BB85",
    // width: "100%",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "800",
    textAlign: "center",
  },
  buttonTextPremium: {
    color: "white",
    fontWeight: "900",
    textAlign: "center",
  },
  logoutButtonCon: {
    width: "100%",
  },
  bannerCard: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    marginVertical: 20,
  },
  bannerCardImage: {
    width: "100%",
    height: 100,
  },
  bannerCardBody: {
    padding: 10,
    marginVertical: 20,
  },
  bannerCardBodyTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  bannerCardBodyContent: {
    fontSize: 19,
  },
  bannerCardBodyTitle2: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 2,
    textAlign: "center",
  },
});
