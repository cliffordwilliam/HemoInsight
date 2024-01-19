import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
    TextInput,
    FlatList,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { GETSERVICES, ADDFAMILY, LOGGEDINUSER } from "../config/queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";

export default function Homepage({ navigation }) {
    // state
    const [servicesData, setServicesData] = useState([]);
    const [familyMember, setFamilyMember] = useState({
        username: "",
        birthdate: "",
        address: "",
        commorbidity: "",
    });
    const [loggedinUser, setLoggedinUser] = useState({});
    const [childs, setChilds] = useState([]);

    // store
    const { removeTokenLogin } = useContext(LoginContext);

    // get Services Data
    const { data: Services } = useQuery(GETSERVICES, {
        onCompleted: (res) => {
            console.log("Home page -> onCompleted QueryGETSERVICES", res);
            setServicesData(Services.services);
        },
    });

    // get logged in user Data
    // const { data: LoggedinUserData, client } = useQuery(LOGGEDINUSER, {
    //     onCompleted: (res) => {
    //         console.log(
    //             "Home page ->onCompleted QueryLOGGEDINUSER>>>>>>>>>>>>>>>>>>>",
    //             res
    //         );
    //         setLoggedinUser(LoggedinUserData.loggedIn[0]);
    //     },
    // });

    const [funcLoggedIn, { data: LoggedinUserDataLazy }] = useLazyQuery(
        LOGGEDINUSER,
        {
            onCompleted: (res) => {
                console.log(
                    "Home page ->onCompleted QueryLOGGEDINUSER>>>>>>>>>>>>>>>>>>>",
                    LoggedinUserDataLazy.loggedIn[0].childs
                );

                console.log(res, `<<<< res baru ${new Date()}`);
                setLoggedinUser(res?.loggedIn[0]);
                setChilds(LoggedinUserDataLazy?.loggedIn[0]?.childs || []);
            },
            onError: (err) => {
                console.log(err, "LOGGEDINUSER error");
            },
        }
    );

    useEffect(() => {
        funcLoggedIn();
    }, []);

    // press -> Logout
    const handleLogout = async () => {
        console.log("Home page -> logout removeTokenLogin");
        await removeTokenLogin();
        await client.resetStore();
    };

    // add Family Member
    const handleChangeInput = (value, key) => {
        setFamilyMember({
            ...familyMember,
            [key]: value,
        });
    };
    // db talk
    const [MutateFamMember, { data: AddFamilyResponse }] = useMutation(
        ADDFAMILY,
        {
            onCompleted: async (res) => {
                console.log(
                    "Home page -> onCompleted ADDFAMILY",
                    AddFamilyResponse.createChild.username
                );
                await funcLoggedIn();
            },
            refetchQueries: [LOGGEDINUSER],
        }
    );
    // press -> MutateFamMember
    const AddFamilyMemberAction = () => {
        MutateFamMember({
            variables: {
                payload: {
                    username: familyMember.username,
                    birthdate: familyMember.birthdate,
                    address: familyMember.address,
                    commorbidity: familyMember.commorbidity,
                },
            },
        });
    };
    // render
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.con}>
                    {/* profile card */}
                    <View style={styles.profileCard}>
                        <Text>username: {loggedinUser?.username}</Text>
                        <Text>email: {loggedinUser.email}</Text>
                        <Text>birthdate: {loggedinUser.birthdate}</Text>
                        <Text>weight: {loggedinUser.weight}</Text>
                        <Text>height: {loggedinUser.height}</Text>
                        <Text>address: {loggedinUser.address}</Text>
                        <Text>status: {loggedinUser.status}</Text>
                        <Text>commorbidity: {loggedinUser.commorbidity}</Text>
                    </View>

                    {/* Family Member */}
                    <View style={styles.familyMemberForm}>
                        <Text>My Family Member</Text>
                        {/* {loggedinUser?.childs?.map((child) => {
                            return (
                                <View style={{ flexDirection: "row", gap: 4 }}>
                                    <View
                                        style={{
                                            width: 250,
                                            height: 30,
                                            backgroundColor: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text>{child?.username}</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 30,
                                            height: 30,
                                            backgroundColor: "white",
                                            borderRadius: 8,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={{ fontSize: 20 }}>+</Text>
                                    </View>
                                </View>
                            );
                        })} */}
                        <FlatList
                            renderItem={({ item: child }) => (
                                <View style={{ flexDirection: "row", gap: 4 }}>
                                    <View
                                        style={{
                                            width: 250,
                                            height: 30,
                                            backgroundColor: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text>{child?.username}</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 30,
                                            height: 30,
                                            backgroundColor: "white",
                                            borderRadius: 8,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={{ fontSize: 20 }}>+</Text>
                                    </View>
                                </View>
                            )}
                            data={LoggedinUserDataLazy.loggedIn[0].childs}
                            keyExtractor={(item) => item._id}
                        />
                        {/* {childs?.map((child, index) => {
                            return (
                                <View
                                    style={{ flexDirection: "row", gap: 4 }}
                                    key={index}
                                >
                                    <View
                                        style={{
                                            width: 250,
                                            height: 30,
                                            backgroundColor: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text>{child?.username}</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 30,
                                            height: 30,
                                            backgroundColor: "white",
                                            borderRadius: 8,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={{ fontSize: 20 }}>+</Text>
                                    </View>
                                </View>
                            );
                        })} */}
                    </View>
                    <View></View>
                    {/* add fam form */}
                    <View style={styles.addFamForm}>
                        {/* title */}
                        <Text>Add Family Member</Text>
                        {/* username */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Username"
                            onChangeText={(text) =>
                                handleChangeInput(text, "username")
                            }
                        />
                        {/* birthdate */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Birthdate"
                            onChangeText={(text) =>
                                handleChangeInput(text, "birthdate")
                            }
                        />
                        {/* address */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Address"
                            onChangeText={(text) =>
                                handleChangeInput(text, "address")
                            }
                        />
                        {/* commorbidity */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Commorbidity"
                            onChangeText={(text) =>
                                handleChangeInput(text, "commorbidity")
                            }
                        />

                        {/* submit */}
                        <Pressable
                            onPress={AddFamilyMemberAction}
                            style={styles.button}
                        >
                            <Text>Submit</Text>
                        </Pressable>
                    </View>
                    {/* page button container */}
                    <View style={styles.hflex}>
                        {/* record */}
                        <Pressable style={styles.pageButton}>
                            <Text>My Health Record</Text>
                        </Pressable>
                        {/* appointment */}
                        <Pressable style={styles.pageButton}>
                            <Text>Create Appointment</Text>
                        </Pressable>
                        {/* logout */}
                        <Pressable
                            style={styles.pageButton}
                            onPress={handleLogout}
                        >
                            <Text>Logout</Text>
                        </Pressable>
                    </View>
                </View>
                {/* services container */}
                <ScrollView>
                    <View style={styles.con}>
                        {/* service card */}
                        {servicesData.map((service) => {
                            return (
                                <View
                                    style={styles.serviceCard}
                                    key={service._id}
                                >
                                    <Text style={styles.serviceCardTitle}>
                                        {service.title}
                                    </Text>
                                    <Text>Clinic: {service.clinic}</Text>
                                    <Text style={styles.serviceCardContent}>
                                        {service.description}
                                    </Text>
                                    <Text>Price: Rp{service.price},000</Text>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        height: 250,
        backgroundColor: "teal",
        borderRadius: 20,
    },
    addFamForm: {
        width: "100%",
        height: 350,
        backgroundColor: "lightblue",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    familyMemberForm: {
        width: "100%",
        height: 250,
        backgroundColor: "lightblue",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },

    textInput: {
        margin: 5,
        width: 200,
        height: 40,
        backgroundColor: "white",
        padding: 5,
        borderRadius: 8,
    },
    button: {
        margin: 5,
        width: 80,
        height: 40,
        backgroundColor: "teal",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    hflex: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
    },
    pageButton: {
        width: 110,
        height: 110,
        backgroundColor: "lightblue",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    serviceCard: {
        width: "100%",
        height: 280,
        borderColor: "lightblue",
        borderWidth: 5,
        borderRadius: 10,
        flexDirection: "column",
        marginVertical: 5,
        padding: 10,
        justifyContent: "space-between",
    },
    serviceCardTitle: { fontWeight: "700", fontSize: 20 },
    serviceCardContent: {
        backgroundColor: "lightgray",
        padding: 9,
        margin: 8,
    },
});
