import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { apiService } from "../services/api";
import Cookies from "js-cookie";
import { useSnackBar } from "../hooks/useSnackBar";
const errorHandling = (error, showSnackbar) => {
  const message = error.response?.data?.message;
  const errorMes = error.response?.data?.error;

  if (typeof message === "object" && message !== null) {
    Object.entries(message).forEach(([field, messages]) => {
      if (Array.isArray(messages)) {
        messages.forEach((msg) => showSnackbar(`${field}: ${msg}`));
      } else {
        showSnackbar(`${field}: ${messages}`);
      }
    });
  } else {
    if (message) showSnackbar(message, "error");
    if (errorMes && errorMes !== message) showSnackbar(errorMes);
  }
};
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const { success, error: showError } = useSnackBar();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Initialize auth state from cookies and Firebase
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for existing token in cookies
        const existingToken = Cookies.get("auth_token");
        if (existingToken) {
          setToken(existingToken);

          // Verify token with backend
          try {
            const response = await apiService.get("/auth/me");
            setUser(response.data.user);
            setUserRole(response.data.user.role);
          } catch (error) {
            // Token is invalid, remove it
            Cookies.remove("auth_token");
            setToken(null);
            setUser(null);
            setUserRole(null);
          }
        }

        // Listen to Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // Get Firebase ID token
            const idToken = await firebaseUser.getIdToken();

            // If we don't have a backend token, try to authenticate
            if (!token) {
              try {
                const response = await apiService.post("/auth/firebase", {
                  idToken,
                });
                const { token: backendToken, user: backendUser } =
                  response.data;

                // Store token in cookies
                Cookies.set("auth_token", backendToken, { expires: 7 }); // 7 days
                setToken(backendToken);
                setUser(backendUser);
                setUserRole(backendUser.role);
              } catch (error) {
                console.error("Error authenticating with backend:", error);
                // Sign out from Firebase if backend auth fails
                await signOut(auth);
              }
            }
          } else {
            // Firebase user signed out
            setUser(null);
            setToken(null);
            setUserRole(null);
            Cookies.remove("auth_token");
          }
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error initializing auth:", error);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const [isMainSearchOpen, setIsMainSearchOpen] = useState(false);
  const [ForgotPasswordData, setForgotPasswordData] = useState(null);
  const [VerifyOtpData, setVerifyOtpData] = useState(null);
  const [register, setRegister] = useState(false);
  const [Profile, setProfile] = useState([]);
  const [LawyerProfile, setLawyerProfile] = useState([]);
  const [ClientProfile, setClientProfile] = useState(null);
  const [LawyerEducation, setLawyerEducation] = useState([]);
  const [LawyerExperience, setLawyerExperience] = useState([]);
  const [SearchLawyers, setSearchLawyers] = useState([]);
  const [LawyerDetails, setLawyerDetails] = useState([]);
  const [BlogData, setBlogData] = useState([]);
  const [SingleBlog, setSingleBlog] = useState([]);
  const [Specialization, setSpecialization] = useState([]);
  const [SpecializationDetails, setSpecializationDetails] = useState(null);
  const [SpecializationData, setSpecializationData] = useState([]);
  const [LawyerService, setLawyerService] = useState([]);
  const [lawyerDashboard, setLawyerDashboard] = useState();
  const [LawyerAppointments, setLawyerAppointments] = useState([]);
  const [ClientAppointments, setClientAppointments] = useState([]);
  const [LawyerCases, setLawyerCases] = useState([]);
  const [singleCase, setSingleCase] = useState([]);
  const [LawyerCaseTypes, setLawyerCaseTypes] = useState([]);
  const [LawyerCaseStages, setLawyerCaseStages] = useState([]);
  const [LawyerCustomFields, setLawyerCustomFields] = useState([]);
  const [LawyerCaseContacts, setLawyerCaseContacts] = useState([]);
  const [singleContact, setSingleContact] = useState({});
  const [ClientDashboard, setClientDashboard] = useState();
  const [LawyerBlog, setLawyerBlog] = useState([]);
  const [LawyerTimeSheet, setLawyerTimeSheet] = useState([]);
  const [LawyerReviews, setLawyerReviews] = useState([]);
  const [LawyerTimeTable, setLawyerTimeTable] = useState([]);
  const [AboutUsData, setAboutUsData] = useState([]);
  const [PrivacyPolicy, setPrivacyPolicy] = useState([]);
  const [TermsAndConditions, setTermsAndConditions] = useState([]);
  const [CompanySettingData, setCompanySettingData] = useState([]);
  const [ClientTransaction, setClientTransaction] = useState(null);
  const [LawyerTransaction, setLawyerTransaction] = useState(null);
  const [SupportTicket, setSupportTicket] = useState([]);
  const [SingleSupportTicket, setSingleSupportTicket] = useState(null);
  const [bankData, setBankData] = useState([]);
  const [depositData, setDepositData] = useState([]);
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [walletData, setWalletData] = useState([]);
  const [Packages, setPackages] = useState([]);
  const [LaywerPackages, setLaywerPackages] = useState([]);
  const [PackagesServices, setPackagesServices] = useState([]);
  const [LawyerSubcategories, setLawyerSubcategories] = useState(null);
  const [ServicesWithCate, setServicesWithCate] = useState(null);
  const [ServiceCategories, setServiceCategories] = useState(null);
  const [singleAppointment, setSingleAppointment] = useState({});
  const [subCategoriesData, setSubCategories] = useState([]);
  const [AllAreasData, setAllAreasData] = useState([]);
  const [AllDistricts, setAllDistricts] = useState([]);
  const [BookesCategory, setBookesCategory] = useState([]);
  const [BookesSubCategory, setBookesSubCategory] = useState([]);
  const [AllBooks, setAllBooks] = useState([]);

  // Role handling
  const auth = user || JSON.parse(localStorage.getItem("legal_user_token"));
  const role = auth?.user?.roles?.[0]?.name;

  // ————————————————————————
  // 🔐 AUTH APIs
  // ————————————————————————

  const login = async (credentials) => {
    setLoading((prev) => ({ ...prev, login: true }));
    try {
      const response = await apiService.post("login", credentials);
      const { token: authToken, user: authUser } = response.data;
      Cookies.set("auth_token", authToken, { expires: 7 });
      localStorage.setItem("legal_user_token", JSON.stringify(response.data));
      success(response.data?.message);
      setToken(authToken);
      setUser(authUser);
      setUserRole(authUser.role);
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, login: false }));
    }
  };

  const forgotPassword = async (obj) => {
    setLoading((prev) => ({ ...prev, forgotPassword: true }));
    try {
      const response = await apiService.post("forgot-password", obj);
      setForgotPasswordData(response.data);
      success(response.data.message);
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, forgotPassword: false }));
    }
  };

  const verifyOtp = async (obj) => {
    setLoading((prev) => ({ ...prev, verifyOtp: true }));
    try {
      const response = await apiService.post("verify-otp", obj);
      setVerifyOtpData(response.data);
      success(response.data.message);
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, verifyOtp: false }));
    }
  };

  const resetPassword = async (obj) => {
    setLoading((prev) => ({ ...prev, resetPassword: true }));
    try {
      const response = await apiService.post("reset-password", obj);
      setVerifyOtpData(null);
      setForgotPasswordData(null);
      success(response.data.message);
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, resetPassword: false }));
    }
  };

  // ————————————————————————
  // 📝 REGISTER APIs
  // ————————————————————————

  const RegisterLawyers = async (obj) => {
    setLoading((prev) => ({ ...prev, RegisterLawyers: true }));
    try {
      await apiService.post("register-lawyer", obj, {
        payloadType: "formData",
      });
      setRegister(true);
      success("Lawyer registered successfully.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, RegisterLawyers: false }));
    }
  };

  const RegisterClient = async (obj) => {
    setLoading((prev) => ({ ...prev, RegisterClient: true }));
    try {
      await apiService.post("register-client", obj, {
        payloadType: "formData",
      });
      setRegister(true);
      success("Client registered successfully.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, RegisterClient: false }));
    }
  };

  // ————————————————————————
  // 👤 PROFILE APIs
  // ————————————————————————

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("my-profile");
      setProfile(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const UpadateProfile = async (obj) => {
    setLoading((prev) => ({ ...prev, UpadateProfile: true }));
    try {
      await apiService.post("update-profile", obj, { payloadType: "formData" });
      await getProfile();
      success("Profile updated successfully.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, UpadateProfile: false }));
    }
  };

  const getLawyerProfile = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("lawyer/profile");
      setLawyerProfile(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const updateLawyerProfile = async (formData) => {
    setLoading((prev) => ({ ...prev, updateLawyerProfile: true }));
    try {
      await apiService.post("lawyer/profile", formData, {
        payloadType: "formData",
      });
      await getLawyerProfile();
      success("Lawyer profile updated.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, updateLawyerProfile: false }));
    }
  };

  const getClientProfile = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("client/profile");
      setClientProfile(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const updateClientProfile = async (obj) => {
    setLoading((prev) => ({ ...prev, updateClientProfile: true }));
    try {
      await apiService.post("client/profile", obj, { payloadType: "formData" });
      await getClientProfile();
      success("Client profile updated.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, updateClientProfile: false }));
    }
  };

  // ————————————————————————
  // 🎓 EDUCATION & EXPERIENCE
  // ————————————————————————

  const getLawyerEducation = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("lawyer/educations");
      setLawyerEducation(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const storeUpdateLawyerEducation = async (obj) => {
    setLoading((prev) => ({ ...prev, storeUpdateLawyerEducation: true }));
    try {
      await apiService.post("lawyer/education", obj);
      await getLawyerEducation();
      success("Education updated.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeUpdateLawyerEducation: false }));
    }
  };

  const DeleteLawyerEducation = async (id) => {
    setLoading((prev) => ({ ...prev, DeleteLawyerEducation: true }));
    try {
      await apiService.delete(`lawyer/delete-education/${id}`);
      await getLawyerEducation();
      success("Education deleted.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, DeleteLawyerEducation: false }));
    }
  };

  const getLawyerExperience = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("lawyer/experiences");
      setLawyerExperience(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const storeUpdateLawyerExperience = async (obj) => {
    setLoading((prev) => ({ ...prev, storeUpdateLawyerExperience: true }));
    try {
      await apiService.post("lawyer/experience", obj);
      await getLawyerExperience();
      success("Experience updated.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeUpdateLawyerExperience: false }));
    }
  };

  const DeleteLawyerExperience = async (id) => {
    setLoading((prev) => ({ ...prev, DeleteLawyerExperience: true }));
    try {
      await apiService.delete(`lawyer/delete-experience/${id}`);
      await getLawyerExperience();
      success("Experience deleted.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, DeleteLawyerExperience: false }));
    }
  };

  // ————————————————————————
  // 🌍 LOCATION & CATEGORIES
  // ————————————————————————
    const [Cities, setCities] = useState([]);

  const getCities = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("cities");
      setCities(response.data.cities);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getSearchLawyers = async (
    district_id = "",
    city_id = "",
    specialization_id = "",
    specialization_type_id = "",
    category_id = "",
    service_id = ""
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (district_id) params.append("district_id", district_id);
      if (city_id) params.append("city_id", city_id);
      if (specialization_id)
        params.append("specialization_id", specialization_id);
      if (specialization_type_id)
        params.append("specialization_type_id", specialization_type_id);
      if (category_id) params.append("category_id", category_id);
      if (service_id) params.append("service_id", service_id);

      const url = params.toString()
        ? `/search-lawyers?${params}`
        : "/search-lawyers";
      const response = await apiService.get(url);
      setSearchLawyers(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getLawyerDetails = async (id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`lawyer/${id}/details`);
      setLawyerDetails(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };
    const [AllCountries, setAllCountries] = useState([]);

  const getAllCountries = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("country/all");
      setAllCountries(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };
    const [AllStatesById, setAllStatesById] = useState([]);

  const getAllStatesById = async (id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`state/country/${id}`);
      setAllStatesById(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };
    const [AllDistrictsByStateId, setAllDistricsByStateId] = useState([]);

  const getAllDistricsByStateId = async (id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`city/state/${id}`);
      setAllDistricsByStateId(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };
    const [AllCitiessByDistrictId, setAllCitiessByDistrictId] = useState([]);

  const getAllCitiessByDistrictId = async (id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`subcity/city/${id}`);
      setAllCitiessByDistrictId(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getAllAreas = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("get-areas");
      setAllAreasData(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getAllDistricts = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("all-city");
      setAllDistricts(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  // ————————————————————————
  // 📚 BLOGS & CONTENT
  // ————————————————————————

  const getBlogData = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("get-blogs");
      setBlogData(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getSingleBlog = async (id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`get-blog/${id}`);
      setSingleBlog(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const postBlogComment = async (obj) => {
    setLoading((prev) => ({ ...prev, postBlogComment: true }));
    try {
      await apiService.post("blog-comment", obj);
      await getSingleBlog(obj.blog_id);
      success("Comment posted.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, postBlogComment: false }));
    }
  };

  const getSpecialization = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("specializations-with-types");
      setSpecialization(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getSpecializationDetails = async (specializationId) => {
    setLoading(true);
    try {
      const response = await apiService.get(
        `specialization/${specializationId}`
      );
      setSpecializationDetails(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getSpecializationData = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("get-specializations");
      setSpecializationData(response.data.specializations);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getAboutUsData = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("about-us");
      setAboutUsData(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getPrivacyPolicy = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("privacy-policy");
      setPrivacyPolicy(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getTermsAndConditions = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("terms");
      setTermsAndConditions(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getCompanySettingData = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("company");
      setCompanySettingData(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  // ————————————————————————
  // 📅 APPOINTMENTS
  // ————————————————————————

  const storeAppointmentByClinet = async (obj) => {
    setLoading((prev) => ({ ...prev, storeAppointmentByClinet: true }));
    try {
      await apiService.post("appointment", obj);
      success("Appointment booked.");
      await getLawyerDetails(obj.lawyer_id);
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeAppointmentByClinet: false }));
    }
  };

  const getLawyerAppointments = async (obj) => {
    setLoading((prev) => ({ ...prev, getLawyerAppointments: true }));
    try {
      const response = await apiService.post("appointments/lawyer", obj);
      setLawyerAppointments(response.data || []);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
      return null;
    } finally {
      setLoading((prev) => ({ ...prev, getLawyerAppointments: false }));
    }
  };

  const getClientAppointments = async (obj) => {
    setLoading((prev) => ({ ...prev, getClientAppointments: true }));
    try {
      const response = await apiService.post("appointments/client", obj);
      setClientAppointments(response.data || []);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
      return null;
    } finally {
      setLoading((prev) => ({ ...prev, getClientAppointments: false }));
    }
  };

  const getSingleAppointment = async (id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`appointment/${id}`);
      setSingleAppointment(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const acceptAppointment = async (id) => {
    setLoading((prev) => ({ ...prev, acceptAppointment: true }));
    try {
      await apiService.get(`appointment/accept/${id}`);
      await getSingleAppointment(id);
      success("Appointment accepted.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, acceptAppointment: false }));
    }
  };

  const completedAppointment = async (id) => {
    setLoading((prev) => ({ ...prev, completedAppointment: true }));
    try {
      await apiService.get(`appointment/complete/${id}`);
      await getSingleAppointment(id);
      success("Appointment completed.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, completedAppointment: false }));
    }
  };

  const handleUpload = async (obj) => {
    setLoading((prev) => ({ ...prev, handleUpload: true }));
    try {
      const formData = new FormData();
      formData.append("appointment_id", obj.appointment_id);
      formData.append("attachment", obj.attachment);
      await apiService.post("upload-appointment-documents", formData, {
        payloadType: "formData",
      });
      success("File uploaded.");
      await getSingleAppointment(obj.appointment_id);
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, handleUpload: false }));
    }
  };

  // ————————————————————————
  // 💰 PAYMENTS & WALLET
  // ————————————————————————

  const getWallet = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("lawyer-wallet");
      setWalletData(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getLawyerTransaction = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("lawyer/transactions");
      setLawyerTransaction(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };
  const getLawyerAppointment = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("lawyer/services");
      setLawyerAppointment(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const postLawyerAppointment = async (obj) => {
    setLoading((prev) => ({ ...prev, postLawyerAppointment: true }));
    try {
      await apiService.post("appointment/reschedule-by-lawyer", obj);
      await getLawyerAppointment();
      success("Appointment rescheduled.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, postLawyerAppointment: false }));
    }
  };

  // ————————————————————————
  // 📊 DASHBOARD
  // ————————————————————————

  const getLawyerDashboard = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("lawyer/dashboard");
      setLawyerDashboard(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getClientDashboard = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("client/dashboard");
      setClientDashboard(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  // ————————————————————————
  // 📚 CASES
  // ————————————————————————

  const getLawyerCases = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("cases/lawyer");
      setLawyerCases(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const storeUpdateLawyerCase = async (obj) => {
    setLoading((prev) => ({ ...prev, storeUpdateLawyerCase: true }));
    try {
      await apiService.post("case", obj);
      await getLawyerCases();
      success("Case updated.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeUpdateLawyerCase: false }));
    }
  };

  const deleteLawyerCase = async (id) => {
    setLoading((prev) => ({ ...prev, deleteLawyerCase: true }));
    try {
      await apiService.delete(`case/${id}`);
      await getLawyerCases();
      success("Case deleted.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, deleteLawyerCase: false }));
    }
  };

  const getLawyerCaseTypes = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("case-types");
      setLawyerCaseTypes(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getLawyerCaseStages = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("case-stages");
      setLawyerCaseStages(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getLawyerCustomFields = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("custom-fields");
      setLawyerCustomFields(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getLawyerCaseContacts = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("case-contacts");
      setLawyerCaseContacts(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const storeUpdateLawyerCaseContact = async (obj) => {
    setLoading((prev) => ({ ...prev, storeUpdateLawyerCaseContact: true }));
    try {
      await apiService.post("case-contact", obj);
      await getLawyerCaseContacts();
      success("Contact updated.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeUpdateLawyerCaseContact: false }));
    }
  };

  const deleteLawyerCaseContact = async (id) => {
    setLoading((prev) => ({ ...prev, deleteLawyerCaseContact: true }));
    try {
      await apiService.delete(`case-contact/${id}`);
      await getLawyerCaseContacts();
      success("Contact deleted.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, deleteLawyerCaseContact: false }));
    }
  };

  // ————————————————————————
  // 📝 BLOGS
  // ————————————————————————

  const getLawyerBlog = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("lawyer/blogs");
      setLawyerBlog(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const storeUpdateLawyerBlog = async (obj) => {
    setLoading((prev) => ({ ...prev, storeUpdateLawyerBlog: true }));
    try {
      await apiService.post("lawyer/blog", obj, { payloadType: "formData" });
      await getLawyerBlog();
      success("Blog updated.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeUpdateLawyerBlog: false }));
    }
  };

  const deleteLawyerBlog = async (id) => {
    setLoading((prev) => ({ ...prev, deleteLawyerBlog: true }));
    try {
      await apiService.delete(`lawyer/blog/${id}`);
      await getLawyerBlog();
      success("Blog deleted.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, deleteLawyerBlog: false }));
    }
  };

  // ————————————————————————
  // ⏱️ TIME SHEET & REVIEWS
  // ————————————————————————

  const getLawyerTimeSheet = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("timesheet");
      setLawyerTimeSheet(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getLawyerReviews = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("reviews");
      setLawyerReviews(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getLawyerTimeTable = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("lawyer/timetables");
      setLawyerTimeTable(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const deleteLawyerTimeTable = async (id) => {
    setLoading((prev) => ({ ...prev, deleteLawyerTimeTable: true }));
    try {
      await apiService.delete(`lawyer/timetable/${id}`);
      await getLawyerTimeTable();
      success("Time table deleted.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, deleteLawyerTimeTable: false }));
    }
  };

  const storeUpdateLawyerTimeTable = async (obj) => {
    setLoading((prev) => ({ ...prev, storeUpdateLawyerTimeTable: true }));
    try {
      await apiService.post("lawyer/timetable", obj);
      await getLawyerTimeTable();
      success("Time table updated.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeUpdateLawyerTimeTable: false }));
    }
  };

  // ————————————————————————
  // 💬 OTHERS
  // ————————————————————————

  const storeContactus = async (obj) => {
    setLoading((prev) => ({ ...prev, storeContactus: true }));
    try {
      await apiService.post("contact-us", obj);
      success("Message sent successfully.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeContactus: false }));
    }
  };

  const postReview = async (obj) => {
    setLoading((prev) => ({ ...prev, postReview: true }));
    try {
      await apiService.post("review", obj);
      success("Review posted.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, postReview: false }));
    }
  };

  const postNewsLetter = async (email) => {
    setLoading((prev) => ({ ...prev, postNewsLetter: true }));
    try {
      await apiService.post("newsletter", { email });
      success("Subscribed to newsletter.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, postNewsLetter: false }));
    }
  };

  const postBusySchedule = async (obj) => {
    setLoading((prev) => ({ ...prev, postBusySchedule: true }));
    try {
      await apiService.post("busy-schedule", obj);
      success("Schedule marked busy.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, postBusySchedule: false }));
    }
  };

  // ————————————————————————
  // 🎟️ SUPPORT TICKETS
  // ————————————————————————

  const getSupportTicket = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("support-tickets");
      setSupportTicket(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const storeUpdateSupportTicket = async (obj) => {
    setLoading((prev) => ({ ...prev, storeUpdateSupportTicket: true }));
    try {
      await apiService.post("support-ticket", obj, { payloadType: "formData" });
      await getSupportTicket();
      success("Ticket updated.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeUpdateSupportTicket: false }));
    }
  };

  const getSingleSupportTicket = async (id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`support-ticket/${id}`);
      setSingleSupportTicket(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const storeUpdateSupportTicketMessages = async (obj) => {
    setLoading((prev) => ({ ...prev, storeUpdateSupportTicketMessages: true }));
    try {
      const formData = new FormData();
      formData.append("support_ticket_id", obj.support_ticket_id);
      formData.append("message", obj.message);
      if (obj.attachment) formData.append("attach_file", obj.attachment);
      await apiService.post("support-ticket-detail/store", formData, {
        payloadType: "formData",
      });
      await getSingleSupportTicket(obj.support_ticket_id);
      success("Message sent.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({
        ...prev,
        storeUpdateSupportTicketMessages: false,
      }));
    }
  };

  // ————————————————————————
  // 📦 PACKAGES
  // ————————————————————————

  const getPackages = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("packages");
      setPackages(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getLawyer = async (id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`lawyer/${id}`);
      setLaywerPackages(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getPackagesServices = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("package-services");
      setPackagesServices(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const storeUpdatePackagesLawyer = async (obj) => {
    setLoading((prev) => ({ ...prev, storeUpdatePackagesLawyer: true }));
    try {
      await apiService.post("lawyer/package", obj);
      success("Package updated.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeUpdatePackagesLawyer: false }));
    }
  };

  // ————————————————————————
  // 🌍 CATEGORIES & SUBCATEGORIES
  // ————————————————————————

  const getLawyerSubcategories = async (id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`showSubCategoriesid/${id}`);
      setLawyerSubcategories(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getServicesWithCate = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("showCategorisSubCategoris");
      setServicesWithCate(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getServiceCategories = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("service-categories");
      setServiceCategories(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getSubCategories = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("Subcategories");
      setSubCategories(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  // ————————————————————————
  // 📚 BOOKS
  // ————————————————————————

  const getBookesCategory = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("book-categories");
      setBookesCategory(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getBookesSubCategory = async (id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`book-subcategories/${id}`);
      setBookesSubCategory(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getAllBooks = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("books");
      setAllBooks(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };
  const getClientTransaction = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("client/transactions");
      setClientTransaction(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const getBank = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("bank-accounts");
      setBankData(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const storeBank = async (obj) => {
    setLoading((prev) => ({ ...prev, storeBank: true }));
    try {
      await apiService.post("bank-account", obj);
      await getBank();
      success("Bank added.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeBank: false }));
    }
  };

  const getDeposit = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("deposits");
      setDepositData(response.data);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const storeDeposit = async (form) => {
    setLoading((prev) => ({ ...prev, storeDeposit: true }));
    try {
      const formData = new FormData();
      formData.append("amount", form.amount);
      formData.append("type", form.type);
      if (form.attatchment) formData.append("attatchment", form.attatchment);
      await apiService.post("deposit", formData, { payloadType: "formData" });
      await getDeposit();
      success("Deposit request sent.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeDeposit: false }));
    }
  };

  const getWithdrawal = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("withdrawals");
      setWithdrawalData(response.data.data || []);
      return response.data;
    } catch (err) {
      errorHandling(err, showError);
    } finally {
      setLoading(false);
    }
  };

  const storeWithdrawal = async (obj) => {
    setLoading((prev) => ({ ...prev, storeWithdrawal: true }));
    try {
      await apiService.post("withdrawal", obj);
      await getWithdrawal();
      success("Withdrawal request sent.");
      return { success: true };
    } catch (err) {
      errorHandling(err, showError);
      return { success: false };
    } finally {
      setLoading((prev) => ({ ...prev, storeWithdrawal: false }));
    }
  };

  // ————————————————————————
  // ✅ OTHER APIs
  // ————————————————————————

  const handleLogout = () => {
    localStorage.removeItem("legal_user_token");
    Cookies.remove("auth_token");
    setUser(null);
    setToken(null);
    setUserRole(null);
    success("Logged out successfully.");
    setTimeout(() => window.location.reload(), 1000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRelaord = () => window.location.reload();

  const value = {
    user,
    token,
    loading,
    userRole,
    login,
    isAuthenticated: !!user && !!token,
    isMainSearchOpen,
    Profile,
    LawyerProfile,
    ClientProfile,
    LawyerEducation,
    LawyerExperience,
    SearchLawyers,
    LawyerDetails,
    BlogData,
    SingleBlog,
    Specialization,
    SpecializationDetails,
    SpecializationData,
    LawyerService,
    LawyerAppointments,
    ClientAppointments,
    LawyerCases,
    singleCase,
    LawyerCaseTypes,
    LawyerCaseStages,
    LawyerCustomFields,
    LawyerCaseContacts,
    singleContact,
    LawyerBlog,
    LawyerTimeSheet,
    LawyerReviews,
    LawyerTimeTable,
    AboutUsData,
    PrivacyPolicy,
    TermsAndConditions,
    CompanySettingData,
    ClientTransaction,
    LawyerTransaction,
    SupportTicket,
    SingleSupportTicket,
    bankData,
    depositData,
    withdrawalData,
    walletData,
    Packages,
    LaywerPackages,
    PackagesServices,
    LawyerSubcategories,
    ServicesWithCate,
    ServiceCategories,
    singleAppointment,
    subCategoriesData,
    AllAreasData,
    AllDistricts,
    BookesCategory,
    BookesSubCategory,
    AllBooks,

    // Flags
    role,
    register,
    ForgotPasswordData,
    VerifyOtpData,

    // Functions
    validateEmail,
    setIsMainSearchOpen,
    forgotPassword,
    verifyOtp,
    resetPassword,
    handleLogout,
    RegisterLawyers,
    RegisterClient,
    setRegister,
    getProfile,
    UpadateProfile,
    getLawyerProfile,
    updateLawyerProfile,
    getClientProfile,
    updateClientProfile,
    getLawyerEducation,
    storeUpdateLawyerEducation,
    DeleteLawyerEducation,
    getLawyerExperience,
    storeUpdateLawyerExperience,
    DeleteLawyerExperience,
    getCities,
    getSearchLawyers,
    getLawyerDetails,
    getBlogData,
    getSingleBlog,
    postBlogComment,
    getLawyerAppointments,
    getClientAppointments,
    getAboutUsData,
    acceptAppointment,
    completedAppointment,
    getPrivacyPolicy,
    getTermsAndConditions,
    getCompanySettingData,
    getClientTransaction,
    getLawyerTransaction,
    handleRelaord,
    getBank,
    storeBank,
    getDeposit,
    storeDeposit,
    getWithdrawal,
    storeWithdrawal,
    getWallet,
    handleUpload,
    getSingleAppointment,
    getAllCitiessByDistrictId,
    getAllAreas,
    getAllDistricts,
    getLawyerAppointment,
    postLawyerAppointment,
    getLawyerDashboard,
    getClientDashboard,
    getLawyerCases,
    storeUpdateLawyerCase,
    deleteLawyerCase,
    getLawyerCaseTypes,
    getLawyerCaseStages,
    getLawyerCustomFields,
    getLawyerCaseContacts,
    storeUpdateLawyerCaseContact,
    deleteLawyerCaseContact,
    getLawyerBlog,
    storeUpdateLawyerBlog,
    deleteLawyerBlog,
    getLawyerTimeSheet,
    getLawyerReviews,
    getLawyerTimeTable,
    deleteLawyerTimeTable,
    storeUpdateLawyerTimeTable,
    storeContactus,
    postReview,
    postNewsLetter,
    postBusySchedule,
    getSupportTicket,
    storeUpdateSupportTicket,
    getSingleSupportTicket,
    storeUpdateSupportTicketMessages,

    getPackages,
    getLawyer,
    getPackagesServices,
    storeUpdatePackagesLawyer,
    getLawyerSubcategories,
    getServicesWithCate,
    getServiceCategories,
    getSubCategories,
    ClientDashboard,  
    getBookesCategory,
    getBookesSubCategory,
    getAllBooks,
    lawyerDashboard,
    storeAppointmentByClinet,getSpecializationData,
    getSpecializationDetails,
    getSpecialization,
    AllCitiessByDistrictId,
    getAllDistricsByStateId,
    AllDistrictsByStateId,
    getAllStatesById,
    AllStatesById,
    getAllCountries,
    AllCountries,
    Cities
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
