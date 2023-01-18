////////////////////
// Constant List, storing string for error or success message
////////////////////

// First character will follow each section
// Second character will use these
// Success = S
// Failed = F
// Database = D

// General = G
const GSConnect = "Connected to API." ; 
const GFFind = "Unable to find the data." ; 
const GFUpdate = "Unable to update the data." ; 
const GFDelete = "Unable to delete the data." ; 
const GPasswordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_,./]).{3,20}$" ; 
const GFFormat = "Data format is not valid." ; 


// Chat = C
const CSCreate = "Chat created." ; 
const CFCreate = "Failed to create the chat." ; 

// Donor = D
const DDContent = "requestId endDate comment isFinish";
const DSParticipate = "User participate.";
const DFParticipate = "Failed to participate.";
const DSReview = "Reviewed.";
const DFReview = "Failed to add review.";

// Event = E
const EDContent = "userId image name date location status";
const ESCreate = "Event created." ; 
const EFCreate = "Failed to create the event." ; 
const Approved = "approved" ; 
const Pending = "pending" ; 
const Rejected = "rejected" ; 
const ESStatus = "Event request status changed to " ; 
const ESUpdate = "Event request updated." ; 
const ESDelete = "Event request deleted." ; 

// Login = L
const LFAccount = "Account not found." ; 
const L1Day = "1 day" ; 
const LFPassword = "Wrong password." ; 

// Marker = M
const MDContentUser = "username location bloodType image canDonate" ;
const MDContentRequest = "userId location bloodType quantity isDone" ;

// Register = R
const RFPasswordMatch = "Password must match." ;
const RFUserExist = "There is already an account with that email. Please use another email." ;
const RDefaultImage = "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" ;
const RUser = "user" ;
const RSCreate = "Account created." ;

// Request = R2
const R2DContent = "userId location bloodType quantity isDone" ;
const R2DContent2 = "username image" ;
const R2SCreate = "Request created." ;
const R2FCreate = "Failed to create the request." ;
const R2SUpdate = "Request updated." ;
const R2SDelete = "Request deleted." ;
const R2DQuantity = "quantity" ;
const R2FZeroLess = "Can't put 0 or less for quantity"

// User = U
const USUpdate = "User updated." ;
const UDContent = "username email role location bloodType canDonate image" ;
const USDelete = "User deleted." ;


module.exports = {
  // General
  GSConnect,
  GFFind,
  GFUpdate,
  GFDelete,
  GPasswordRegex,
  GFFormat,
  
  // Chat
  CSCreate,
  CFCreate,

  // Donor
  DDContent,
  DSParticipate,
  DFParticipate,
  DSReview,
  DFReview,

  // Event
  EDContent,
  ESCreate,
  EFCreate,
  Approved,
  Pending,
  Rejected,
  ESStatus,
  ESUpdate,
  ESDelete,

  // Login
  LFAccount,
  L1Day,
  LFPassword,

  // Marker
  MDContentUser,
  MDContentRequest,

  // Register
  RFPasswordMatch,
  RFUserExist,
  RDefaultImage,
  RUser,
  RSCreate,

  // Request
  R2DContent,
  R2DContent2,
  R2DQuantity,
  R2SCreate,
  R2FCreate,
  R2SUpdate,
  R2SDelete,
  R2FZeroLess,

  // User
  USUpdate,
  UDContent,
  USDelete
};