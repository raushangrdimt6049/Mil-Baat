// c:\Users\saura\OneDrive\Pictures\Mil Baat App\logic.js

// Logic to handle the "Auto Apply" effect
const acceptBtn = document.getElementById('acceptBtn');
const overlay = document.getElementById('entry-overlay');
const mainContent = document.getElementById('main-content');
const chatInputBar = document.getElementById('chatInputBar');
const body = document.body;
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const menuIconBtn = document.getElementById('menuIconBtn');
const menuOptions = document.getElementById('menuOptions');
const logoutBtn = document.getElementById('logoutBtn');
const logoutModal = document.getElementById('logout-modal');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');
const changePassModal = document.getElementById('change-pass-modal');
const oldPassInput = document.getElementById('oldPassInput');
const newPassInput = document.getElementById('newPassInput');
const confirmChangePass = document.getElementById('confirmChangePass');
const cancelChangePass = document.getElementById('cancelChangePass');
const changePassError = document.getElementById('changePassError');
const changePassBtn = document.getElementById('changePassBtn');
const profileBtn = document.getElementById('profileBtn');
const profileModal = document.getElementById('profile-modal');
const closeProfileBtn = document.getElementById('closeProfileBtn');
const uploadTriggerBtn = document.getElementById('uploadTriggerBtn');
const profileFileInput = document.getElementById('profileFileInput');
const profileImageDisplay = document.getElementById('profileImageDisplay');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const sendMsgBtn = document.getElementById('sendMsgBtn');
const msgInput = document.getElementById('msgInput');
const chatMessages = document.getElementById('chatMessages');
const profileUsernameDisplay = document.getElementById('profileUsernameDisplay');
const logoDisplay = document.querySelector('.logo');
const userStatusIndicator = document.getElementById('userStatusIndicator');
const headerTypingIndicator = document.getElementById('headerTypingIndicator');
const lastSeenDisplay = document.getElementById('lastSeenDisplay');
const typingIndicator = document.getElementById('typingIndicator');
const clearChatBtn = document.getElementById('clearChatBtn');
const deleteMsgModal = document.getElementById('delete-msg-modal');
const confirmDeleteMsg = document.getElementById('confirmDeleteMsg');
const cancelDeleteMsg = document.getElementById('cancelDeleteMsg');
const clearChatModal = document.getElementById('clear-chat-modal');
const confirmClearChat = document.getElementById('confirmClearChat');
const cancelClearChat = document.getElementById('cancelClearChat');
const messageOptionsModal = document.getElementById('message-options-modal');
const pinMsgBtn = document.getElementById('pinMsgBtn');
const deleteMsgOptionBtn = document.getElementById('deleteMsgOptionBtn');
const cancelMsgOptions = document.getElementById('cancelMsgOptions');
const pinnedMessageBar = document.getElementById('pinnedMessageBar');
const pinnedSender = document.getElementById('pinnedSender');
const pinnedText = document.getElementById('pinnedText');
const unpinBtn = document.getElementById('unpinBtn');
const replyPreview = document.getElementById('replyPreview');
const replySender = document.getElementById('replySender');
const replyText = document.getElementById('replyText');
const cancelReplyBtn = document.getElementById('cancelReplyBtn');
const attachBtn = document.getElementById('attachBtn');
const cameraBtn = document.getElementById('cameraBtn');
const micBtn = document.getElementById('micBtn');
const chatFileInput = document.getElementById('chatFileInput');
const chatCameraInput = document.getElementById('chatCameraInput');
const imagePreviewOverlay = document.getElementById('image-preview-overlay');
const previewImage = document.getElementById('previewImage');
const retakeBtn = document.getElementById('retakeBtn');
const filterBtn = document.getElementById('filterBtn');
const cropBtn = document.getElementById('cropBtn');
const sendImageBtn = document.getElementById('sendImageBtn');
const imageViewerModal = document.getElementById('image-viewer-modal');
const viewerImage = document.getElementById('viewerImage');
const closeViewerBtn = document.getElementById('closeViewerBtn');
const zoomSlider = document.getElementById('zoomSlider');
const cameraLiveOverlay = document.getElementById('camera-live-overlay');
const cameraVideo = document.getElementById('cameraVideo');
const closeCameraBtn = document.getElementById('closeCameraBtn');
const flipCameraBtn = document.getElementById('flipCameraBtn');
const captureCameraBtn = document.getElementById('captureCameraBtn');
const flashCameraBtn = document.getElementById('flashCameraBtn');
const audioRecordingOverlay = document.getElementById('audio-recording-overlay');
const recordingTimer = document.getElementById('recordingTimer');
const cancelAudioBtn = document.getElementById('cancelAudioBtn');
const sendAudioBtn = document.getElementById('sendAudioBtn');
const audioVisualizer = document.getElementById('audioVisualizer');
const audioCallBtn = document.getElementById('audioCallBtn');
const videoCallBtn = document.getElementById('videoCallBtn');
const callOverlay = document.getElementById('call-overlay');
const callVideoContainer = document.getElementById('callVideoContainer');
const callLocalVideo = document.getElementById('callLocalVideo');
const callRemoteVideo = document.getElementById('callRemoteVideo');
const callRemoteAudio = document.getElementById('callRemoteAudio');
const callAudioContainer = document.getElementById('callAudioContainer');
const callStatusText = document.getElementById('callStatusText');
const callTimer = document.getElementById('callTimer');
const callMuteBtn = document.getElementById('callMuteBtn');
const callEndBtn = document.getElementById('callEndBtn');
const callFlipBtn = document.getElementById('callFlipBtn');
const callAudioOutputBtn = document.getElementById('callAudioOutputBtn');
const callVideoMuteBtn = document.getElementById('callVideoMuteBtn');
const incomingCallModal = document.getElementById('incoming-call-modal');
const incomingCallTitle = document.getElementById('incomingCallTitle');
const incomingCallType = document.getElementById('incomingCallType');
const acceptCallBtn = document.getElementById('acceptCallBtn');
const rejectCallBtn = document.getElementById('rejectCallBtn');
const callPipBtn = document.getElementById('callPipBtn');
let cameraStream = null;
let currentFacingMode = 'environment';
let isFlashOn = false;
let currentImageBase64 = null;
let cropper = null;
let baseImageForFilter = null;
let currentFilterMode = 0; // 0:None, 1:Gray, 2:Sepia, 3:Invert

const users = (typeof envUsers !== 'undefined') ? envUsers : { 'Raushan_143': '4gh4m01r', 'Nisha_143': '4gh4m01r' };

// Initialize Firebase
let db;
try {
    if (typeof envFirebaseConfig !== 'undefined' && envFirebaseConfig.databaseURL) {
        firebase.initializeApp(envFirebaseConfig);
        db = firebase.database();
    } else {
        console.error("Firebase Configuration Missing!");
        alert("Database connection failed. Please check your configuration.");
    }
} catch (e) { console.error("Firebase Init Error:", e); }

// Verify Connection
db.ref(".info/connected").on("value", (snap) => {
    if (snap.val() === true) {
        console.log("✅ Firebase Realtime Database Connected!");
    } else {
        console.log("❌ Firebase Disconnected (or connecting...)");
    }
});

let serverTimeOffset = 0;
db.ref(".info/serverTimeOffset").on("value", (snap) => {
    serverTimeOffset = snap.val();
});

let currentUser = null;
let msgToDeleteId = null;
let selectedMsgId = null;
let replyToMsg = null;
let heartbeatInterval = null;
let statusCheckInterval = null;
let typingCheckInterval = null;
let mediaRecorder = null;
let audioChunks = [];
let recordingInterval = null;
let isSendingAudio = false;
let audioContext = null;
let analyser = null;
let visualizerDataArray = null;
let visualizerAnimationId = null;
let lastImageSource = null;
let callStream = null;
let callInterval = null;
let isCallMuted = false;
let isVideoMuted = false;
let callFacingMode = 'user';
let isVideoCall = false;
let pipIsDragging = false;
let pipStartX = 0;
let pipStartY = 0;
let pipInitialLeft = 0;
let pipInitialTop = 0;
let isPipInteractionActive = false;
let peerConnection = null;
let incomingSignalData = null;
let currentChatHistory = [];
let candidateQueue = [];

const rtcConfig = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
    ]
};

// Viewer State
let viewerScale = 1;
let viewerPanning = false;
let viewerStartX = 0;
let viewerStartY = 0;
let viewerTranslateX = 0;
let viewerTranslateY = 0;
let initialPinchDistance = 0;
let initialScale = 1;

function triggerShake(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

// Helper to format date for divider
function getFormattedDate(dateObj) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[dateObj.getDay()];
    const d = String(dateObj.getDate()).padStart(2, '0');
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const y = dateObj.getFullYear();
    const datePart = `${d}/${m}/${y}`;
    return `${dayName}, ${datePart}`;
}

// Helper for long press to delete
function addLongPressHandler(element, id) {
    let pressTimer;
    const start = () => {
        pressTimer = setTimeout(() => {
            selectedMsgId = id;
            messageOptionsModal.style.display = 'flex';
            mainContent.classList.add('blur-content');
            if (navigator.vibrate) navigator.vibrate(50);
        }, 600);
    };
    const cancel = () => { clearTimeout(pressTimer); };
    
    element.addEventListener('touchstart', start, {passive: true});
    element.addEventListener('touchend', cancel);
    element.addEventListener('touchmove', cancel);
    element.addEventListener('mousedown', start);
    element.addEventListener('mouseup', cancel);
    element.addEventListener('mouseleave', cancel);
    element.addEventListener('contextmenu', e => e.preventDefault());
}

// Helper for Swipe to Reply
function addSwipeHandler(element, msg) {
    let startX = 0;
    let currentX = 0;
    
    element.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        element.style.transition = 'none';
    }, {passive: true});

    element.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        if (diff > 0) { // Swipe Right
             // Add resistance
             const move = Math.min(diff, 80);
             element.style.transform = `translateX(${move}px)`;
        }
    }, {passive: true});

    element.addEventListener('touchend', () => {
        const diff = currentX - startX;
        element.style.transition = 'transform 0.3s ease';
        element.style.transform = 'translateX(0)';
        
        if (diff > 60) {
            startReply(msg);
            if (navigator.vibrate) navigator.vibrate(30);
        }
    });
}

function startReply(msg) {
    replyToMsg = msg;
    replyPreview.style.display = 'flex';
    replySender.innerText = msg.sender === currentUser ? 'You' : msg.sender;
    replyText.innerText = msg.text;
    msgInput.focus();
}

function getMessageTable(sender) {
    return sender === 'Raushan_143' ? 'alpha' : 'beta';
}

function getUserRole(username) {
    return username === 'Raushan_143' ? 'Alpha' : 'Beta';
}

// --- Chat History Logic ---
function setupFirebaseListeners() {
    // 1. Chat Messages Listener
    db.ref('messages').on('value', snapshot => {
        try {
            const data = snapshot.val();
            let history = [];
            if (data) {
                if (data.alpha && typeof data.alpha === 'object') history = history.concat(Object.values(data.alpha));
                if (data.beta && typeof data.beta === 'object') history = history.concat(Object.values(data.beta));
            }
            // Filter out any invalid entries
            history = history.filter(msg => msg && typeof msg === 'object' && msg.timestamp);
            
            // Sort messages by date to ensure correct order
            history.sort((a, b) => {
                return (a.rawDate || "") < (b.rawDate || "") ? -1 : 1;
            });
            currentChatHistory = history;
            renderChat(history);
        } catch (e) {
            console.error("Error processing chat data:", e);
        }
    });

    // 2. Pinned Message Listener
    db.ref('pinned_message').on('value', snapshot => {
        const pinnedMsg = snapshot.val();
        renderPinnedMessage(pinnedMsg);
    });

    // 3. Signaling Listeners (New Structure)
    const myRole = getUserRole(currentUser);

    // Listen for Incoming Signals (Offer, Answer)
    ['Audio', 'Video'].forEach(cType => {
        db.ref(`signals/${myRole}_incoming_${cType}`).on('value', snapshot => {
            const data = snapshot.val();
            
            // If data is null, the call was ended remotely
            if (!data) {
                const isVideo = (cType === 'Video');
                let shouldEnd = false;

                // 1. I am the Caller (or active participant)
                if (callStream && isVideoCall === isVideo) {
                    shouldEnd = true;
                }
                // 2. I am the Receiver (pending call)
                else if (incomingSignalData && incomingSignalData.isVideo === isVideo) {
                    shouldEnd = true;
                }

                if (shouldEnd) {
                    endCall(true);
                }
                return;
            }

            // Handle Offer (Incoming Call)
            if (data.type === 'offer' && data.sender !== currentUser) {
                handleIncomingSignal({
                    type: 'offer',
                    sender: data.sender,
                    data: data.sdp,
                    isVideo: cType === 'Video'
                });
            }
            // Handle Answer (Call Accepted)
            else if (data.type === 'answer' && data.sender !== currentUser) {
                handleIncomingSignal({
                    type: 'answer',
                    sender: data.sender,
                    data: data.sdp,
                    isVideo: cType === 'Video'
                });
            }
        });
    });

    // Listen for Candidates
    db.ref(`signals/${myRole}_candidates`).on('child_added', snapshot => {
        const val = snapshot.val();
        if (val && val.sender !== currentUser) {
            handleIncomingSignal({
                type: 'candidate',
                sender: val.sender,
                data: val.candidate
            });
        }
    });

    // 4. Status Listener (Other User)
    const otherUser = currentUser === 'Raushan_143' ? 'Nisha_143' : 'Raushan_143';
    const otherRole = currentUser === 'Raushan_143' ? 'Beta' : 'Alpha';
    
    let otherUserHeartbeat = 0;
    let otherUserLastSeen = null;

    db.ref('status').on('value', snapshot => {
        const data = snapshot.val() || {};
        otherUserHeartbeat = data[`${otherRole} Heartbeat`] || 0;
        otherUserLastSeen = data[`${otherRole} Last Seen`];
    });

    if (statusCheckInterval) clearInterval(statusCheckInterval);
    statusCheckInterval = setInterval(() => {
        const estimatedServerTime = Date.now() + serverTimeOffset;
        const isOnline = (estimatedServerTime - otherUserHeartbeat) < 2000; // Online if heartbeat within 2 sec
        
        let displayLastSeen = otherUserLastSeen;
        // If timed out but DB still says "Active", use the last heartbeat time
        if (!isOnline && displayLastSeen === "Active") {
            displayLastSeen = otherUserHeartbeat;
        }
        updateStatusUI(isOnline, displayLastSeen);
    }, 500);

    // 5. Typing Listener (Other User)
    db.ref(`typing/${otherUser}`).on('value', snapshot => {
        const isTyping = snapshot.val();
        headerTypingIndicator.style.display = isTyping ? 'block' : 'none';
    });

    // 6. Profile Picture Listener (Load saved photo)
    const userRole = getUserRole(currentUser);
    db.ref(`profile picture/${userRole}_Profile_Picture`).on('value', snapshot => {
        const photo = snapshot.val();
        if (photo) {
            profileImageDisplay.src = photo;
        }
    });
}

function renderChat(history) {
    let historyChanged = false;
    let lastDateDivider = '';

    // Mark messages from the OTHER user as 'seen' when I load them
    history.forEach(msg => {
        // Safety check
        if (!msg || !msg.id) return;

        if (msg.sender !== currentUser && msg.status !== 'seen' && msg.id) {
            // Update status in Firebase
            const table = getMessageTable(msg.sender);
            db.ref(`messages/${table}/${msg.id}/status`).set('seen');
            
            const now = new Date();
            const d = String(now.getDate()).padStart(2, '0');
            const m = String(now.getMonth() + 1).padStart(2, '0');
            const y = now.getFullYear();
            const datePart = `${d}/${m}/${y}`;
            const timePart = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            db.ref(`messages/${table}/${msg.id}/seenTimestamp`).set(`${datePart} ${timePart}`);
        }
    });

    chatMessages.innerHTML = ''; // Clear current view
    
    history.forEach(msg => {
        if (!msg) return;

        // Date Divider Logic
        let msgDateObj = new Date(); // Default to now if missing (for old messages)
        if (msg.rawDate) {
            msgDateObj = new Date(msg.rawDate);
        }
        const dateString = getFormattedDate(msgDateObj);
        
        if (dateString !== lastDateDivider) {
            const divider = document.createElement('div');
            divider.className = 'chat-date-divider';
            divider.innerHTML = `<span>${dateString}</span>`;
            chatMessages.appendChild(divider);
            lastDateDivider = dateString;
        }

        const msgDiv = document.createElement('div');
        const isSent = msg.sender === currentUser;
        msgDiv.classList.add('message-bubble', isSent ? 'msg-sent' : 'msg-received');

        // Render Reply Context if exists
        if (msg.replyTo) {
            const replyDiv = document.createElement('div');
            replyDiv.className = 'replied-msg-context';
            replyDiv.innerHTML = `
                <span class="replied-sender">${msg.replyTo.sender === currentUser ? 'You' : msg.replyTo.sender}</span>
                <span class="replied-text">${msg.replyTo.text}</span>
            `;
            msgDiv.appendChild(replyDiv);
        }
        
        // Render Image if exists
        if (msg.image) {
            const img = document.createElement('img');
            img.src = msg.image;
            img.className = 'msg-image';
            msgDiv.appendChild(img);
        }
        
        // Render Audio if exists
        if (msg.audio) {
            const audio = document.createElement('audio');
            audio.src = msg.audio;
            audio.controls = true;
            audio.className = 'msg-audio';
            msgDiv.appendChild(audio);
        }
        if (msg.text) msgDiv.appendChild(document.createTextNode(msg.text));

        if (msg.id) {
            addLongPressHandler(msgDiv, msg.id);
            addSwipeHandler(msgDiv, msg);
        }
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'msg-time';
        let displayTime = msg.timestamp;
        
        // Add ticks only for sent messages
        let tickHtml = '';
        if (isSent) {
            const tickClass = msg.status === 'seen' ? 'msg-tick seen' : 'msg-tick';
            const tickIcon = msg.status === 'seen' ? '✓✓' : '✓';
            tickHtml = `<span class="${tickClass}">${tickIcon}</span>`;
            
            if (msg.status === 'seen' && msg.seenTimestamp) {
                displayTime = msg.seenTimestamp;
            }
        }

        timeSpan.innerHTML = `${displayTime} ${tickHtml}`;
        msgDiv.appendChild(timeSpan);
        
        chatMessages.appendChild(msgDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 1. Show error if clicking password field while username is empty
passwordInput.addEventListener('focus', () => {
    if (usernameInput.value.trim() === "") {
        usernameError.style.display = 'block';
        triggerShake(usernameInput);
    }
});

// 2. Clear errors when user starts typing
usernameInput.addEventListener('input', () => usernameError.style.display = 'none');
passwordInput.addEventListener('input', () => passwordError.style.display = 'none');

// Allow pressing "Enter" to login
function handleEnterKey(e) {
    if (e.key === 'Enter') {
        acceptBtn.click();
    }
}
usernameInput.addEventListener('keydown', handleEnterKey);
passwordInput.addEventListener('keydown', handleEnterKey);

acceptBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    let hasError = false;

    // Check empty fields
    if (username.trim() === "") {
        usernameError.style.display = 'block';
        triggerShake(usernameInput);
        hasError = true;
    }
    if (password.trim() === "") {
        passwordError.innerText = "Please Enter Password"; // Reset text
        passwordError.style.display = 'block';
        triggerShake(passwordInput);
        hasError = true;
    }
    if (hasError) return;

    if (users[username] && users[username] === password) {
        currentUser = username;
        profileUsernameDisplay.innerText = currentUser;

        if (currentUser === 'Raushan_143') {
            logoDisplay.innerText = '💎_Alpha_💎';
            body.classList.add('user-raushan');
            body.classList.remove('user-nisha');
        } else if (currentUser === 'Nisha_143') {
            logoDisplay.innerText = '💎_Beta_💎';
            body.classList.add('user-nisha');
            body.classList.remove('user-raushan');
        }
        
        // Push state to history to trap back button
        history.pushState({ loggedIn: true }, "", window.location.href);

        setupFirebaseListeners();
        startHeartbeat();

        // 1. Fade out the overlay
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';

        // 2. Enable scrolling on body
        body.style.overflow = 'auto';

        // 3. Reveal the main content
        mainContent.style.display = 'flex';
        chatInputBar.style.display = 'flex';

        // Small timeout to allow the display:block to render before changing opacity for transition
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 50);
    } else {
        passwordError.innerText = "Incorrect Username or Password";
        passwordError.style.display = 'block';
        triggerShake(usernameInput);
        triggerShake(passwordInput);
    }
});

// --- Online Status Logic ---
function startHeartbeat() {
    const userRole = currentUser === 'Raushan_143' ? 'Alpha' : 'Beta';
    const onlineRef = db.ref(`status/${userRole} Online`);
    const lastSeenRef = db.ref(`status/${userRole} Last Seen`);
    const heartbeatRef = db.ref(`status/${userRole} Heartbeat`);

    onlineRef.set(true);
    lastSeenRef.set("Active");

    onlineRef.onDisconnect().set(false);
    lastSeenRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);

    if (heartbeatInterval) clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(() => {
        heartbeatRef.set(firebase.database.ServerValue.TIMESTAMP);
    }, 500);
}

function updateStatusUI(isOnline, lastSeen) {
    if (isOnline === true || lastSeen === "Active") {
        userStatusIndicator.style.display = 'block';
        lastSeenDisplay.style.display = 'none';
    } else {
        userStatusIndicator.style.display = 'none';
        if (typeof lastSeen === 'number') {
            const dateObj = new Date(lastSeen);
            const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const d = String(dateObj.getDate()).padStart(2, '0');
            const m = String(dateObj.getMonth() + 1).padStart(2, '0');
            const y = dateObj.getFullYear();
            const datePart = `${d}/${m}/${y}`;
            
            lastSeenDisplay.innerText = `Last seen: ${datePart} ${timeStr}`;
            lastSeenDisplay.style.display = 'block';
        } else {
            lastSeenDisplay.style.display = 'none';
        }
    }
}

// --- Menu & Logout Logic ---

// Toggle Menu
menuIconBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menuOptions.style.display === 'flex') {
        menuOptions.style.display = 'none';
    } else {
        menuOptions.style.display = 'flex';
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuIconBtn.contains(e.target) && !menuOptions.contains(e.target)) {
        menuOptions.style.display = 'none';
    }
});

// --- Clear Chat Logic ---
clearChatBtn.addEventListener('click', () => {
    menuOptions.style.display = 'none';
    clearChatModal.style.display = 'flex';
    mainContent.classList.add('blur-content');
});

confirmClearChat.addEventListener('click', () => {
    if (db) {
        db.ref('messages').remove().catch(e => console.error(e));
        db.ref('pinned_message').remove().catch(e => console.error(e));
    }
    clearChatModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
});

cancelClearChat.addEventListener('click', () => {
    clearChatModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
});

// --- Message Options & Pinning Logic ---

function closeOptionsModal() {
    messageOptionsModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
}

cancelMsgOptions.addEventListener('click', () => {
    closeOptionsModal();
    selectedMsgId = null;
});

deleteMsgOptionBtn.addEventListener('click', () => {
    msgToDeleteId = selectedMsgId;
    closeOptionsModal();
    // Open delete confirmation
    deleteMsgModal.style.display = 'flex';
    mainContent.classList.add('blur-content');
});

pinMsgBtn.addEventListener('click', () => {
    // Fetch message details from DB to pin
    const msg = currentChatHistory.find(m => m.id === selectedMsgId);
    if (msg) {
        db.ref('pinned_message').set(msg);
    }
    closeOptionsModal();
});

unpinBtn.addEventListener('click', () => {
    db.ref('pinned_message').remove();
});

function renderPinnedMessage(pinnedMsg) {
    if (pinnedMsg) {
        pinnedMessageBar.style.display = 'flex';
        pinnedSender.innerText = pinnedMsg.sender === currentUser ? 'You' : pinnedMsg.sender;
        
        let displayText = pinnedMsg.text;
        if (!displayText) {
            if (pinnedMsg.image) displayText = '📷 Image';
            else if (pinnedMsg.audio) displayText = '🎤 Audio Message';
            else displayText = 'Message';
        }
        pinnedText.innerText = displayText;
    } else {
        pinnedMessageBar.style.display = 'none';
    }
}

// --- Delete Message Logic ---
confirmDeleteMsg.addEventListener('click', () => {
    if (msgToDeleteId) {
        const idToDelete = msgToDeleteId;
        const msg = currentChatHistory.find(m => m.id === idToDelete);
        if (msg) {
            const table = getMessageTable(msg.sender);
            db.ref(`messages/${table}/${idToDelete}`).remove();
        }
        
        // Check if deleted message was pinned
        db.ref('pinned_message').once('value').then(snapshot => {
            const pinnedMsg = snapshot.val();
            if (pinnedMsg && pinnedMsg.id === idToDelete) {
                db.ref('pinned_message').remove();
            }
        });

        deleteMsgModal.style.display = 'none';
        mainContent.classList.remove('blur-content');
        msgToDeleteId = null;
    }
});

cancelDeleteMsg.addEventListener('click', () => {
    deleteMsgModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
    msgToDeleteId = null;
});

cancelReplyBtn.addEventListener('click', () => {
    replyToMsg = null;
    replyPreview.style.display = 'none';
});

// --- Change Password Logic ---
changePassBtn.addEventListener('click', () => {
    menuOptions.style.display = 'none';
    changePassModal.style.display = 'flex';
    mainContent.classList.add('blur-content');
    // Reset fields
    oldPassInput.value = '';
    newPassInput.value = '';
    changePassError.style.display = 'none';
});

cancelChangePass.addEventListener('click', () => {
    changePassModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
});

confirmChangePass.addEventListener('click', () => {
    if (oldPassInput.value === users[currentUser]) {
        if (newPassInput.value.trim() !== "") {
            users[currentUser] = newPassInput.value;
            alert("Password Updated Successfully!");
            changePassModal.style.display = 'none';
            mainContent.classList.remove('blur-content');
        } else {
            changePassError.innerText = "New password cannot be empty";
            changePassError.style.display = 'block';
            triggerShake(newPassInput);
        }
    } else {
        changePassError.innerText = "Incorrect Old Password";
        changePassError.style.display = 'block';
        triggerShake(oldPassInput);
    }
});

// --- Profile Logic ---
profileBtn.addEventListener('click', () => {
    menuOptions.style.display = 'none';
    profileModal.style.display = 'flex';
    mainContent.classList.add('blur-content');
});

closeProfileBtn.addEventListener('click', () => {
    profileModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
});

// Trigger file input when button is clicked
uploadTriggerBtn.addEventListener('click', () => {
    profileFileInput.click();
});

// Handle file selection and preview
profileFileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64 = e.target.result;
            // Update the image source with the uploaded file data
            profileImageDisplay.src = base64;

            // Upload to Firebase for persistence
            if (currentUser && db) {
                const userRole = getUserRole(currentUser);
                db.ref(`profile picture/${userRole}_Profile_Picture`).set(base64)
                    .catch(err => console.error("Error uploading profile pic:", err));
            }
        }
        reader.readAsDataURL(this.files[0]);
    }
});

// --- Theme Toggle Logic ---
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        themeToggleBtn.innerText = '🌙 Dark Mode';
    } else {
        themeToggleBtn.innerText = '☀️ Light Mode';
    }
});

// Typing detection
msgInput.addEventListener('input', () => {
    if (currentUser && db) {
        const typingRef = db.ref(`typing/${currentUser}`);
        typingRef.set(true);
        // Clear typing status after 2 seconds of inactivity
        setTimeout(() => typingRef.set(false), 2000);
    }
});

// Enter key to send message
msgInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMsgBtn.click();
    }
});

// --- Chat Functionality ---
sendMsgBtn.addEventListener('click', () => {
    const text = msgInput.value.trim();
    
    if (!currentUser) {
        alert("You appear to be logged out. Please refresh the page.");
        return;
    }
    if (!db) {
        alert("Database not connected. Cannot send message.");
        return;
    }

    if (text !== "") {
        const now = new Date();
        // Format: DD/MM HH:MM AM/PM
        const d = String(now.getDate()).padStart(2, '0');
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const y = now.getFullYear();
        const datePart = `${d}/${m}/${y}`;
        const timePart = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timeString = `${datePart} ${timePart}`;
        const rawDate = now.toISOString();

        // Stop typing status immediately
        if (currentUser) db.ref(`typing/${currentUser}`).set(false).catch(e => console.error(e));

        const table = getMessageTable(currentUser);
        const newMsgRef = db.ref(`messages/${table}`).push();
        const recipient = currentUser === 'Raushan_143' ? 'Nisha_143' : 'Raushan_143';
        const newMsg = {
            id: newMsgRef.key,
            sender: currentUser,
            recipient: recipient,
            text: text,
            timestamp: timeString,
            rawDate: rawDate,
            status: 'sent', // Initial status
            // Add reply info
            replyTo: replyToMsg ? {
                sender: replyToMsg.sender,
                text: replyToMsg.text
            } : null
        };
        newMsgRef.set(newMsg).catch(error => {
            console.error("Send Error:", error);
            alert("Failed to send message: " + error.message);
        });

        // Clear reply state
        replyToMsg = null;
        replyPreview.style.display = 'none';
        msgInput.value = '';
    }
});

// --- Chat Actions (Attachment, Camera, Mic) ---
attachBtn.addEventListener('click', () => {
    chatFileInput.click();
});

// --- Live Camera Logic ---
cameraBtn.addEventListener('click', () => {
    cameraLiveOverlay.style.display = 'flex';
    startCameraStream();
});

async function startCameraStream() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
    
    // Mirror effect for front camera
    if (currentFacingMode === 'user') {
        cameraVideo.style.transform = 'scaleX(-1)';
    } else {
        cameraVideo.style.transform = 'none';
    }

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: currentFacingMode }
        });
        cameraVideo.srcObject = cameraStream;

        // Handle Flash Button Visibility
        const track = cameraStream.getVideoTracks()[0];
        const capabilities = track.getCapabilities ? track.getCapabilities() : {};
        
        if (capabilities.torch) {
            flashCameraBtn.style.display = 'flex';
        } else {
            flashCameraBtn.style.display = 'none';
        }
        isFlashOn = false;
        flashCameraBtn.style.color = 'white';
    } catch (err) {
        console.error(err);
        alert("Unable to access camera. Please ensure permissions are granted.");
        cameraLiveOverlay.style.display = 'none';
    }
}

flipCameraBtn.addEventListener('click', () => {
    currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    startCameraStream();
});

flashCameraBtn.addEventListener('click', () => {
    if (cameraStream) {
        const track = cameraStream.getVideoTracks()[0];
        isFlashOn = !isFlashOn;
        track.applyConstraints({
            advanced: [{ torch: isFlashOn }]
        }).then(() => {
            flashCameraBtn.style.color = isFlashOn ? '#ffd700' : 'white';
        }).catch(err => {
            console.error("Flash error:", err);
        });
    }
});

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    cameraLiveOverlay.style.display = 'none';
}

closeCameraBtn.addEventListener('click', stopCamera);

captureCameraBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = cameraVideo.videoWidth;
    canvas.height = cameraVideo.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Mirror capture if front camera
    if (currentFacingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
    }
    
    ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);
    
    // Get image
    currentImageBase64 = canvas.toDataURL('image/jpeg');
    baseImageForFilter = currentImageBase64;
    currentFilterMode = 0;
    lastImageSource = 'camera';
    
    // Stop camera and show preview
    stopCamera();
    
    // Show existing preview overlay
    previewImage.src = currentImageBase64;
    imagePreviewOverlay.style.display = 'flex';
});

// --- Call Logic (Audio/Video) ---

audioCallBtn.addEventListener('click', () => startCall(false));
videoCallBtn.addEventListener('click', () => startCall(true));

async function startCall(video, isIncoming = false) {
    menuOptions.style.display = 'none';
    isVideoCall = video;
    
    // 1. UI Setup
    callOverlay.style.display = 'flex';
    callOverlay.classList.remove('pip-mode'); // Reset PiP
    
    // Reset Media Elements
    callRemoteAudio.srcObject = null;
    callRemoteVideo.srcObject = null;
    callLocalVideo.srcObject = null;
    
    // Reset Buttons
    isCallMuted = false;
    isVideoMuted = false;
    callMuteBtn.innerText = '🎤';
    callMuteBtn.style.background = 'rgba(255,255,255,0.2)';
    callVideoMuteBtn.innerText = '📷';
    callVideoMuteBtn.style.background = 'rgba(255,255,255,0.2)';
    
    // Configure UI based on call type
    if (video) {
        callVideoContainer.style.display = 'block';
        callAudioContainer.style.display = 'none';
        callRemoteVideo.style.display = 'block';
        callFlipBtn.style.display = 'flex';
        callVideoMuteBtn.style.display = 'flex';
        callFacingMode = 'user';
    } else {
        callVideoContainer.style.display = 'none';
        callAudioContainer.style.display = 'flex';
        callFlipBtn.style.display = 'none';
        callVideoMuteBtn.style.display = 'none';
    }

    callStatusText.innerText = isIncoming ? "Connecting..." : "Ringing...";
    callTimer.innerText = "00:00";

    // 2. Get Local Media
    try {
        const constraints = {
            audio: true,
            video: video ? { facingMode: callFacingMode } : false
        };
        
        callStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Force enable tracks
        callStream.getAudioTracks().forEach(t => t.enabled = true);
        
        if (video) {
            callStream.getVideoTracks().forEach(t => t.enabled = true);
            callLocalVideo.srcObject = callStream;
            callLocalVideo.style.transform = 'scaleX(-1)'; // Mirror local
        }

        // 3. Initiate Connection if Caller
        if (!isIncoming) {
            createPeerConnection(true);
        }
        
        return true;
    } catch (err) {
        console.error("Media Error:", err);
        alert("Could not access Camera/Microphone. Please check permissions.");
        endCall();
        return false;
    }
}


function createPeerConnection(isInitiator) {
    peerConnection = new RTCPeerConnection(rtcConfig);

    // ICE Candidates
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            sendSignal('candidate', event.candidate);
        }
    };

    // Remote Stream Handling
    peerConnection.ontrack = (event) => {
        const stream = event.streams[0] || new MediaStream([event.track]);
        
        const mediaElement = isVideoCall ? callRemoteVideo : callRemoteAudio;
        
        // Only set if different to avoid resets
        if (mediaElement.srcObject !== stream) {
            mediaElement.srcObject = stream;
            console.log("Remote stream attached to", isVideoCall ? "Video" : "Audio");
        }
        
        // Robust Playback
        mediaElement.autoplay = true;
        mediaElement.playsInline = true;
        mediaElement.muted = false;
        mediaElement.volume = 1.0;
        
        const playPromise = mediaElement.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error("Auto-play failed:", error);
                // Fallback: Play on interaction
                document.body.addEventListener('click', () => mediaElement.play(), { once: true });
            });
        }
    };

    // Add Local Tracks
    if (callStream) {
        callStream.getTracks().forEach(track => peerConnection.addTrack(track, callStream));
    }

    // Offer Logic
    if (isInitiator) {
        peerConnection.createOffer()
            .then(offer => peerConnection.setLocalDescription(offer))
            .then(() => {
                sendSignal('offer', peerConnection.localDescription);
            })
            .catch(e => console.error("Offer Error:", e));
    }
}

function sendSignal(type, data) {
    const myRole = getUserRole(currentUser);
    const targetUser = currentUser === 'Raushan_143' ? 'Nisha_143' : 'Raushan_143';
    const targetRole = getUserRole(targetUser);
    const callType = isVideoCall ? 'Video' : 'Audio';
    
    // Paths
    const incomingPath = `signals/${targetRole}_incoming_${callType}`; // Where I write offers
    const myIncomingPath = `signals/${myRole}_incoming_${callType}`; // Where I write answers (if I am receiver)
    const candidatePath = `signals/${targetRole}_candidates`;

    if (type === 'offer') {
        db.ref(incomingPath).set({
            type: 'offer',
            sender: currentUser,
            sdp: JSON.parse(JSON.stringify(data)),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    } else if (type === 'answer') {
        // Send answer to the caller's inbox so they receive it
        db.ref(incomingPath).set({
            type: 'answer',
            sender: currentUser,
            sdp: JSON.parse(JSON.stringify(data)),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    } else if (type === 'candidate') {
        db.ref(candidatePath).push({
            candidate: JSON.parse(JSON.stringify(data)),
            sender: currentUser
        });
    } else if (type === 'end') {
        // Remove all signal nodes for this call type
        db.ref(`signals/${myRole}_incoming_${callType}`).remove();
        db.ref(`signals/${targetRole}_incoming_${callType}`).remove();
        db.ref(`signals/${myRole}_candidates`).remove();
        db.ref(`signals/${targetRole}_candidates`).remove();
    }
}

function handleIncomingSignal(signal) {
    // 1. Offer (Incoming Call)
    if (signal.type === 'offer') {
        incomingSignalData = signal;
        incomingCallTitle.innerText = `Incoming Call from ${signal.sender}`;
        incomingCallType.innerText = signal.isVideo ? "Video Call" : "Audio Call";
        incomingCallModal.style.display = 'flex';
        mainContent.classList.add('blur-content');
    } 
    // 2. Answer (Call Accepted)
    else if (signal.type === 'answer') {
        if (peerConnection && peerConnection.signalingState !== 'stable') {
            const desc = new RTCSessionDescription(signal.data);
            peerConnection.setRemoteDescription(desc)
                .then(() => {
                    console.log("Remote Description Set (Answer)");
                    callStatusText.innerText = "Connected";
                    startCallTimer();
                    processCandidateQueue();
                })
                .catch(e => console.error("Set Remote Desc Error:", e));
        }
    } 
    // 3. Candidate
    else if (signal.type === 'candidate') {
        const candidate = new RTCIceCandidate(signal.data);
        if (peerConnection && peerConnection.remoteDescription) {
            peerConnection.addIceCandidate(candidate).catch(e => console.error("Add ICE Error:", e));
        } else {
            candidateQueue.push(candidate);
        }
    }
}

function processCandidateQueue() {
    if (peerConnection && peerConnection.remoteDescription) {
        while (candidateQueue.length > 0) {
            const cand = candidateQueue.shift();
            peerConnection.addIceCandidate(cand).catch(e => console.error("Queue ICE Error:", e));
        }
    }
}

acceptCallBtn.addEventListener('click', () => {
    incomingCallModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
    
    if (incomingSignalData) {
        // Start call as receiver
        startCall(incomingSignalData.isVideo, true).then(success => {
            if (success) {
                createPeerConnection(false); // Not initiator
                
                const desc = new RTCSessionDescription(incomingSignalData.data);
                peerConnection.setRemoteDescription(desc)
                    .then(() => peerConnection.createAnswer())
                    .then(answer => peerConnection.setLocalDescription(answer))
                    .then(() => {
                        sendSignal('answer', peerConnection.localDescription);
                        callStatusText.innerText = "Connected";
                        startCallTimer();
                        processCandidateQueue();
                    })
                    .catch(e => console.error("Answer Error:", e));
            }
        });
    }
});

rejectCallBtn.addEventListener('click', () => {
    // If we have data, we know the type to clean up
    if (incomingSignalData) {
        const myRole = getUserRole(currentUser);
        const targetUser = currentUser === 'Raushan_143' ? 'Nisha_143' : 'Raushan_143';
        const targetRole = getUserRole(targetUser);
        const type = incomingSignalData.isVideo ? 'Video' : 'Audio';
        
        // Remove ALL signal nodes so the caller detects the rejection immediately
        db.ref(`signals/${myRole}_incoming_${type}`).remove();
        db.ref(`signals/${targetRole}_incoming_${type}`).remove();
        db.ref(`signals/${myRole}_candidates`).remove();
        db.ref(`signals/${targetRole}_candidates`).remove();
    }
    endCall(true);
});

callEndBtn.addEventListener('click', () => endCall(false));

function endCall(remoteEnded = false) {
    // 1. Stop Timer
    if (callInterval) clearInterval(callInterval);
    
    // 2. Send End Signal (if local)
    if (!remoteEnded) {
        sendSignal('end');
    }
    
    // 3. Stop Tracks
    if (callStream) {
        callStream.getTracks().forEach(track => track.stop());
        callStream = null;
    }
    
    // 4. Close Peer Connection
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    
    // 5. Reset UI
    callOverlay.style.display = 'none';
    callOverlay.classList.remove('pip-mode');
    incomingCallModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
    
    // 6. Clear Media Elements
    callRemoteVideo.srcObject = null;
    callRemoteAudio.srcObject = null;
    callLocalVideo.srcObject = null;
    
    candidateQueue = [];
    incomingSignalData = null;
}

function startCallTimer() {
    if (callInterval) clearInterval(callInterval);
    let seconds = 0;
    callTimer.innerText = "00:00";
    callInterval = setInterval(() => {
        seconds++;
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        callTimer.innerText = `${m}:${s}`;
    }, 1000);
}

// Mute/Flip/Output Handlers
callMuteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (callStream) {
        const track = callStream.getAudioTracks()[0];
        if (track) {
            isCallMuted = !isCallMuted;
            track.enabled = !isCallMuted;
            callMuteBtn.innerText = isCallMuted ? '🔇' : '🎤';
            callMuteBtn.style.background = isCallMuted ? '#ff4757' : 'rgba(255,255,255,0.2)';
        }
    }
});

callVideoMuteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (callStream && isVideoCall) {
        const track = callStream.getVideoTracks()[0];
        if (track) {
            isVideoMuted = !isVideoMuted;
            track.enabled = !isVideoMuted;
            callVideoMuteBtn.innerText = isVideoMuted ? '🚫' : '📷';
            callVideoMuteBtn.style.background = isVideoMuted ? '#ff4757' : 'rgba(255,255,255,0.2)';
        }
    }
});

callFlipBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (callStream && isVideoCall) {
        callStream.getVideoTracks().forEach(t => t.stop());
        callFacingMode = callFacingMode === 'user' ? 'environment' : 'user';
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: { facingMode: callFacingMode }
            });
            
            // Update Stream
            const audioTrack = callStream.getAudioTracks()[0];
            if (audioTrack) newStream.addTrack(audioTrack); // Actually getUserMedia returns new audio track too usually, better to just use new stream completely
            
            callStream = newStream;
            callLocalVideo.srcObject = newStream;
            callLocalVideo.style.transform = callFacingMode === 'user' ? 'scaleX(-1)' : 'none';
            
            // Update Peer Connection
            const videoTrack = callStream.getVideoTracks()[0];
            const sender = peerConnection.getSenders().find(s => s.track.kind === 'video');
            if (sender) sender.replaceTrack(videoTrack);
            
            // Restore Mute State
            if (videoTrack) videoTrack.enabled = !isVideoMuted;
            
        } catch (err) { console.error(err); }
    }
});

callAudioOutputBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const element = isVideoCall ? callRemoteVideo : callRemoteAudio;
    if (typeof element.setSinkId !== 'function') {
        alert("Output switching not supported."); return;
    }
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const outputs = devices.filter(d => d.kind === 'audiooutput');
        if (!outputs.length) return;
        
        const current = element.sinkId || 'default';
        const idx = outputs.findIndex(d => d.deviceId === current);
        const next = outputs[(idx + 1) % outputs.length];
        
        await element.setSinkId(next.deviceId);
        callAudioOutputBtn.innerText = (next.label.toLowerCase().includes('speaker')) ? '🔊' : '👂';
    } catch(e) { console.error(e); }
});

// --- PiP Mode Logic ---
callPipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    callOverlay.classList.add('pip-mode');
});

// Modified click listener to handle drag vs click
callOverlay.addEventListener('click', () => {
    if (callOverlay.classList.contains('pip-mode')) {
        if (!pipIsDragging) {
            callOverlay.classList.remove('pip-mode');
            // Reset styles applied during drag
            callOverlay.style.top = '';
            callOverlay.style.left = '';
            callOverlay.style.right = '';
            callOverlay.style.bottom = '';
        }
        pipIsDragging = false;
    }
});

// Draggable PiP Logic
function handlePipStart(e) {
    if (!callOverlay.classList.contains('pip-mode')) return;
    isPipInteractionActive = true;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    pipStartX = clientX;
    pipStartY = clientY;
    
    const rect = callOverlay.getBoundingClientRect();
    pipInitialLeft = rect.left;
    pipInitialTop = rect.top;
    
    pipIsDragging = false;
    callOverlay.style.transition = 'none';
}

function handlePipMove(e) {
    if (!isPipInteractionActive || !callOverlay.classList.contains('pip-mode')) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    if (Math.abs(clientX - pipStartX) > 5 || Math.abs(clientY - pipStartY) > 5) {
        pipIsDragging = true;
    }

    if (pipIsDragging) {
        e.preventDefault();
        const dx = clientX - pipStartX;
        const dy = clientY - pipStartY;
        
        callOverlay.style.left = `${pipInitialLeft + dx}px`;
        callOverlay.style.top = `${pipInitialTop + dy}px`;
        callOverlay.style.right = 'auto';
        callOverlay.style.bottom = 'auto';
    }
}

function handlePipEnd() {
    isPipInteractionActive = false;
    if (callOverlay.classList.contains('pip-mode')) {
        callOverlay.style.transition = 'all 0.3s ease';
    }
}

callOverlay.addEventListener('touchstart', handlePipStart, {passive: false});
callOverlay.addEventListener('touchmove', handlePipMove, {passive: false});
callOverlay.addEventListener('touchend', handlePipEnd);
callOverlay.addEventListener('mousedown', handlePipStart);
window.addEventListener('mousemove', (e) => {
    if (e.buttons === 1) handlePipMove(e);
});
window.addEventListener('mouseup', handlePipEnd);

// --- Audio Recording Logic ---
micBtn.addEventListener('click', () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                startRecording(stream);
            })
            .catch(err => {
                console.error(err);
                alert("Microphone Access Denied or Not Supported.");
            });
    } else {
        alert("Microphone API not supported in this browser context.");
    }
});

function startRecording(stream) {
    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        if (isSendingAudio) {
            const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => {
                sendAudioMessage(reader.result);
            };
        }
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
    };

    mediaRecorder.start();
    audioRecordingOverlay.style.display = 'flex';
    
    startVisualizer(stream);
    
    // Timer Logic
    let seconds = 0;
    recordingTimer.innerText = "00:00";
    recordingInterval = setInterval(() => {
        seconds++;
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        recordingTimer.innerText = `${m}:${s}`;
    }, 1000);
}

function stopRecording(sending) {
    isSendingAudio = sending;
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
    clearInterval(recordingInterval);
    
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    cancelAnimationFrame(visualizerAnimationId);
    
    audioRecordingOverlay.style.display = 'none';
}

function startVisualizer(stream) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 64;
    source.connect(analyser);
    const bufferLength = analyser.frequencyBinCount;
    visualizerDataArray = new Uint8Array(bufferLength);
    drawVisualizer();
}

function drawVisualizer() {
    visualizerAnimationId = requestAnimationFrame(drawVisualizer);
    analyser.getByteFrequencyData(visualizerDataArray);
    const canvasCtx = audioVisualizer.getContext('2d');
    const width = audioVisualizer.width;
    const height = audioVisualizer.height;
    
    canvasCtx.clearRect(0, 0, width, height);
    
    const barWidth = (width / visualizerDataArray.length) * 0.6;
    const gap = (width / visualizerDataArray.length) * 0.4;
    let x = 0;
    
    for(let i = 0; i < visualizerDataArray.length; i++) {
        const barHeight = (visualizerDataArray[i] / 255) * height;
        
        canvasCtx.fillStyle = '#ff4757';
        
        // Draw centered vertically
        const y = (height - barHeight) / 2;
        
        canvasCtx.fillRect(x, y, barWidth, barHeight);
        
        x += barWidth + gap;
    }
}

cancelAudioBtn.addEventListener('click', () => stopRecording(false));
sendAudioBtn.addEventListener('click', () => stopRecording(true));

function sendAudioMessage(base64Audio) {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    const datePart = `${d}/${m}/${y}`;
    const timePart = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeString = `${datePart} ${timePart}`;
    const rawDate = now.toISOString();

    const table = getMessageTable(currentUser);
    const newMsgRef = db.ref(`messages/${table}`).push();
    const recipient = currentUser === 'Raushan_143' ? 'Nisha_143' : 'Raushan_143';
    newMsgRef.set({
        id: newMsgRef.key,
        sender: currentUser,
        recipient: recipient,
        text: '', 
        audio: base64Audio,
        timestamp: timeString,
        rawDate: rawDate,
        status: 'sent',
        replyTo: null
    });
}

// --- Image Preview & Send Logic ---
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        lastImageSource = 'file';
        const reader = new FileReader();
        reader.onload = function(e) {
            currentImageBase64 = e.target.result;
            baseImageForFilter = currentImageBase64;
            currentFilterMode = 0;
            previewImage.src = currentImageBase64;
            imagePreviewOverlay.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }
    // Reset input so same file can be selected again
    event.target.value = '';
}

chatFileInput.addEventListener('change', handleFileSelect);
chatCameraInput.addEventListener('change', handleFileSelect);

retakeBtn.addEventListener('click', () => {
    if (cropper) {
        cropper.destroy();
        cropper = null;
        resetCropButton();
    }
    imagePreviewOverlay.style.display = 'none';
    currentImageBase64 = null;
    previewImage.src = '';
    baseImageForFilter = null;
    currentFilterMode = 0;

    if (lastImageSource === 'camera') {
        cameraLiveOverlay.style.display = 'flex';
        startCameraStream();
    } else if (lastImageSource === 'file') {
        chatFileInput.click();
    }
});

function resetCropButton() {
    cropBtn.innerText = "Crop";
    cropBtn.style.background = "#ff9f43";
    filterBtn.style.display = ''; // Show filter button
    sendImageBtn.style.display = 'flex';
    retakeBtn.style.display = '';
}

cropBtn.addEventListener('click', () => {
    if (!cropper) {
        // Start Cropping
        cropper = new Cropper(previewImage, {
            viewMode: 1,
            autoCropArea: 0.8,
            dragMode: 'move',
            toggleDragModeOnDblclick: false,
        });
        cropBtn.innerText = "Apply";
        cropBtn.style.background = "#28c76f"; // Green
        filterBtn.style.display = 'none'; // Hide filter button while cropping
        sendImageBtn.style.display = 'none';
        retakeBtn.style.display = 'none';
    } else {
        // Apply Crop
        const canvas = cropper.getCroppedCanvas();
        currentImageBase64 = canvas.toDataURL('image/jpeg');
        baseImageForFilter = currentImageBase64; // Commit crop as new base
        currentFilterMode = 0; // Reset filter cycle
        
        // Destroy first to reveal image element
        cropper.destroy();
        cropper = null;
        
        // Update image source
        previewImage.src = currentImageBase64;
        
        resetCropButton();
    }
});

filterBtn.addEventListener('click', () => {
    if (!baseImageForFilter) return;
    
    currentFilterMode = (currentFilterMode + 1) % 4;
    
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (currentFilterMode === 1) ctx.filter = 'grayscale(100%)';
        else if (currentFilterMode === 2) ctx.filter = 'sepia(100%)';
        else if (currentFilterMode === 3) ctx.filter = 'invert(100%)';
        else ctx.filter = 'none';
        
        ctx.drawImage(img, 0, 0);
        currentImageBase64 = canvas.toDataURL('image/jpeg');
        previewImage.src = currentImageBase64;
    };
    img.src = baseImageForFilter;
});

sendImageBtn.addEventListener('click', () => {
    if (currentImageBase64) {
        const now = new Date();
        const d = String(now.getDate()).padStart(2, '0');
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const y = now.getFullYear();
        const datePart = `${d}/${m}/${y}`;
        const timePart = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timeString = `${datePart} ${timePart}`;
        const rawDate = now.toISOString();

        const table = getMessageTable(currentUser);
        const newMsgRef = db.ref(`messages/${table}`).push();
        const recipient = currentUser === 'Raushan_143' ? 'Nisha_143' : 'Raushan_143';
        newMsgRef.set({
            id: newMsgRef.key,
            sender: currentUser,
            recipient: recipient,
            text: '', // Empty text for image message
            image: currentImageBase64,
            timestamp: timeString,
            rawDate: rawDate,
            status: 'sent',
            replyTo: null
        });

        // Cleanup
        imagePreviewOverlay.style.display = 'none';
        currentImageBase64 = null;
    }
});

// --- Image Viewer Logic (Zoom & Pan) ---

// Open Viewer
chatMessages.addEventListener('click', (e) => {
    if (e.target.classList.contains('msg-image')) {
        imageViewerModal.style.display = 'block';
        viewerImage.src = e.target.src;
        // Reset State
        viewerScale = 1;
        viewerTranslateX = 0;
        viewerTranslateY = 0;
        zoomSlider.value = 1;
        updateViewerTransform();
    }
});

// Close Viewer
closeViewerBtn.addEventListener('click', () => {
    imageViewerModal.style.display = 'none';
});

// Update Transform
function updateViewerTransform() {
    viewerImage.style.transform = `translate(${viewerTranslateX}px, ${viewerTranslateY}px) scale(${viewerScale})`;
    zoomSlider.value = viewerScale;
}

// Slider Zoom
zoomSlider.addEventListener('input', (e) => {
    viewerScale = parseFloat(e.target.value);
    updateViewerTransform();
});

// Touch Gestures (Pinch to Zoom & Pan)
viewerImage.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault(); // Prevent browser zoom
        initialPinchDistance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
        initialScale = viewerScale;
    } else if (e.touches.length === 1) {
        viewerPanning = true;
        viewerStartX = e.touches[0].pageX - viewerTranslateX;
        viewerStartY = e.touches[0].pageY - viewerTranslateY;
    }
});

viewerImage.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const currentDistance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
        const diff = currentDistance / initialPinchDistance;
        viewerScale = Math.min(Math.max(1, initialScale * diff), 5);
        updateViewerTransform();
    } else if (e.touches.length === 1 && viewerPanning && viewerScale > 1) {
        e.preventDefault(); // Prevent scroll
        viewerTranslateX = e.touches[0].pageX - viewerStartX;
        viewerTranslateY = e.touches[0].pageY - viewerStartY;
        updateViewerTransform();
    }
});

viewerImage.addEventListener('touchend', () => {
    viewerPanning = false;
});

// Double tap to reset
viewerImage.addEventListener('dblclick', () => {
    viewerScale = 1;
    viewerTranslateX = 0;
    viewerTranslateY = 0;
    updateViewerTransform();
});

// Show Logout Confirmation
logoutBtn.addEventListener('click', () => {
    menuOptions.style.display = 'none';
    logoutModal.style.display = 'flex';
    mainContent.classList.add('blur-content');
});

// Cancel Logout
cancelLogout.addEventListener('click', () => {
    logoutModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
});

// Confirm Logout
confirmLogout.addEventListener('click', () => {
    // Hide Modal & Remove Blur
    logoutModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
    
    // Hide Main Content & Nav
    mainContent.style.display = 'none';
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    chatInputBar.style.display = 'none';
    
    // Show Login Overlay & Reset
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    usernameInput.value = '';
    passwordInput.value = '';
    body.style.overflow = 'hidden';
    body.classList.remove('user-raushan', 'user-nisha');
    
    // Update status one last time before clearing
    if (currentUser && db) {
        const userRole = currentUser === 'Raushan_143' ? 'Alpha' : 'Beta';
        db.ref(`status/${userRole} Online`).set(false);
        db.ref(`status/${userRole} Last Seen`).set(firebase.database.ServerValue.TIMESTAMP);
    }

    // Clear Status Logic
    db.ref().off(); // Detach all listeners
    clearInterval(heartbeatInterval);
    userStatusIndicator.style.display = 'none';
    lastSeenDisplay.style.display = 'none';
    headerTypingIndicator.style.display = 'none';
    currentUser = null;
});

// Listen for storage changes (for real-time sync between tabs)
// Removed window.addEventListener('storage') as Firebase handles real-time updates

// Handle Browser Back/Forward Buttons
window.addEventListener('popstate', () => {
    if (currentUser) {
        // Re-push state to keep user on the page
        history.pushState({ loggedIn: true }, "", window.location.href);
        
        // Show logout confirmation
        menuOptions.style.display = 'none';
        logoutModal.style.display = 'flex';
        mainContent.classList.add('blur-content');
    }
});
