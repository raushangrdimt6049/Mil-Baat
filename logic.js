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

// --- Dynamic Header Setup ---
(function setupHeader() {
    let header = document.querySelector('header');
    if (!header) {
        header = document.createElement('header');
        document.body.prepend(header);
        
        // Move header elements into the new header container
        const headerElements = [menuIconBtn, logoDisplay, userStatusIndicator, profileBtn];
        headerElements.forEach(el => {
            if (el && el.parentNode) header.appendChild(el);
        });
    }

    // Style: Full width, fixed top, neutral dark glass background (works for Light/Dark themes)
    header.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 65px;
        display: flex; align-items: center; justify-content: space-between; padding: 0 15px;
        background: rgba(18, 18, 18, 0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        border-bottom: 3px solid rgba(255, 255, 255, 0.08); z-index: 1000; box-sizing: border-box;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); color: white;
    `;

    // Push content down so it's not hidden behind header
    if (mainContent) mainContent.style.paddingTop = '60px';
})();

// --- Dynamic Footer Setup ---
(function setupFooter() {
    if (chatInputBar) {
        // Style: Fixed bottom, full width, glassmorphism with a cool dark slate tint
        // Note: display is set to 'none' initially, toggled to 'flex' on login
        chatInputBar.style.cssText = `
            position: fixed; bottom: 0; left: 0; width: 100%; height: 60px; 
            display: none; align-items: center; justify-content: space-between; padding: 5px 8px;
            background: rgba(25, 30, 35, 0.9); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            border-top: 3px solid rgba(255, 255, 255, 0.08); z-index: 1000; box-sizing: border-box;
            box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.2); color: white; gap: 5px;
        `;

        // --- Input Box Layout Restructuring ---
        let inputWrapper = document.getElementById('input-box-wrapper');
        if (!inputWrapper) {
            inputWrapper = document.createElement('div');
            inputWrapper.id = 'input-box-wrapper';
            
            // Style the wrapper (The "Box")
            inputWrapper.style.cssText = `
                display: flex; align-items: center; flex: 1;
                background: rgba(255, 255, 255, 0.1); border-radius: 25px;
                padding: 5px 8px; position: relative; min-width: 0;
            `;
            
            // Style Input Field
            if (msgInput) {
                // Emoji Button
                const emojiBtn = document.createElement('button');
                emojiBtn.id = 'emojiBtn';
                emojiBtn.innerHTML = '😀';
                emojiBtn.style.cssText = 'background: transparent; border: none; padding: 0 8px; cursor: pointer; font-size: 1.2rem; margin-right: 0px; line-height: 1; filter: grayscale(0.2); transition: transform 0.2s;';
                emojiBtn.onmouseover = () => emojiBtn.style.transform = 'scale(1.1)';
                emojiBtn.onmouseout = () => emojiBtn.style.transform = 'scale(1)';
                
                inputWrapper.appendChild(emojiBtn);

                msgInput.style.background = 'transparent';
                msgInput.style.border = 'none';
                msgInput.style.color = 'white';
                msgInput.style.flex = '1';
                msgInput.style.padding = '8px';
                msgInput.style.outline = 'none';
                msgInput.placeholder = "Type a Message...";
                inputWrapper.appendChild(msgInput);

                // Emoji Picker Container
                const emojiPicker = document.createElement('div');
                emojiPicker.id = 'emoji-picker';
                emojiPicker.style.cssText = `
                    position: absolute; bottom: 100%; left: 10px; margin-bottom: 10px;
                    width: 300px; max-width: 80vw; height: 250px; overflow-y: auto;
                    background: rgba(30, 30, 40, 0.95); backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px;
                    display: none; grid-template-columns: repeat(auto-fill, minmax(35px, 1fr));
                    padding: 10px; gap: 5px; z-index: 2000; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                `;
                
                const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "👋", "🤚", "🖐", "✋", "🖖", "👌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "💪", "🧠", "🦴", "👀", "👁", "👄", "💋", "🦷", "👅", "👂", "🦻", "👃", "🦵", "🦶", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈️", "♉️", "♊️", "♋️", "♌️", "♍️", "♎️", "♏️", "♐️", "♑️", "♒️", "♓️", "🆔", "⚛️", "🉑", "☢️", "☣️", "📴", "📳", "🈶", "🈚️", "🈸", "🈺", "🈷️", "✴️", "🆚", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "❌", "⭕️", "🛑", "⛔️", "📛", "🚫", "💯", "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "🚭", "❗️", "❕", "❓", "❔", "‼️", "⁉️", "🔅", "🔆", "〽️", "⚠️", "🚸", "🔱", "⚜️", "🔰", "♻️", "✅", "🈯️", "💹", "❇️", "✳️", "❎", "🌐", "🍆", "🍑", "🍓", "🍒", "🥑", "🍔", "🍕", "🍖", "🍗", "🌭", "🥪", "🌮", "🌯", "🥙", "🥚", "🍳", "🥘", "🍲", "🥣", "🥗", "🍿", "🧈", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🦀", "🦞", "🦐", "🦑", "🦪", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕️", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧃", "🧉", "🧊", "🥢", "🍽", "🍴", "🥄", "🔪", "🏺"];

                emojis.forEach(emoji => {
                    const span = document.createElement('span');
                    span.innerText = emoji;
                    span.style.cssText = 'cursor: pointer; font-size: 1.5rem; padding: 5px; text-align: center; user-select: none; transition: transform 0.1s;';
                    span.onmouseover = () => span.style.transform = 'scale(1.2)';
                    span.onmouseout = () => span.style.transform = 'scale(1)';
                    span.onclick = () => {
                        msgInput.value += emoji;
                        msgInput.focus();
                        msgInput.dispatchEvent(new Event('input'));
                    };
                    emojiPicker.appendChild(span);
                });

                chatInputBar.appendChild(emojiPicker);

                emojiBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    emojiPicker.style.display = emojiPicker.style.display === 'grid' ? 'none' : 'grid';
                });

                document.addEventListener('click', (e) => {
                    if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
                        emojiPicker.style.display = 'none';
                    }
                });
            }

            // Style & Move Attach/Camera Icons inside wrapper
            [attachBtn, cameraBtn].forEach(btn => {
                if (btn) {
                    btn.style.background = 'transparent';
                    btn.style.border = 'none';
                    btn.style.padding = '8px';
                    btn.style.cursor = 'pointer';
                    btn.style.fontSize = '1.2rem';
                    inputWrapper.appendChild(btn);
                }
            });

            chatInputBar.prepend(inputWrapper);
            
            // Style Mic & Send Buttons (Outside)
            const actionBtnStyle = `width: 45px; height: 45px; border-radius: 50%; background: transparent; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; padding: 0;`;
            
            if (micBtn) {
                micBtn.style.cssText = actionBtnStyle;
                micBtn.innerHTML = '<img src="Voice Icon.png" style="width: 100%; height: 100%; object-fit: contain;">';
                chatInputBar.appendChild(micBtn);
            }
            if (sendMsgBtn) {
                sendMsgBtn.style.cssText = actionBtnStyle + ' display: none;'; // Hidden initially
                sendMsgBtn.innerHTML = '<img src="Send Icon.png" style="width: 100%; height: 100%; object-fit: contain;">';
                chatInputBar.appendChild(sendMsgBtn);
            }
        }

        // Fix: Move Reply Preview inside Footer to eliminate gap
        if (replyPreview) {
            chatInputBar.appendChild(replyPreview);
            replyPreview.style.cssText = `
                position: absolute; 
                bottom: 100%; 
                left: 0; 
                width: 100%; 
                display: none; 
                background: rgba(20, 20, 30, 0.95);
                backdrop-filter: blur(10px);
                padding: 10px 15px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                justify-content: space-between;
                align-items: center;
                z-index: 998;
                border-left: 4px solid #00d2ff;
                box-sizing: border-box;
            `;
        }

        // --- Chat Container Dimensions & Padding ---
        // You can modify these values manually to fit your design
        if (chatMessages) {
            chatMessages.style.cssText = `
                width: 100%;
                height: 100vh;           /* Full screen height */
                overflow-y: auto;        /* Enable scrolling */
                padding-top: 55px;       /* Space for Header (Adjust manually) */
                padding-bottom: 65px;   /* Space for Footer (Adjust manually) */
                padding-left: 10px;      /* Left spacing */
                padding-right: 10px;     /* Right spacing */
                box-sizing: border-box;  /* Include padding in width/height */
                position: fixed;         /* Fix position to screen */
                top: 0;
                left: 0;
                z-index: 0;              /* Behind header/footer */
                
            `;
        }
    }
})();

// --- Initialize Message Bubble Style ---
(function initMsgStyle() {
    const msgStyle = document.createElement('style');
    msgStyle.id = 'dynamic-msg-style';
    // Default Dark Theme (Gray)
    msgStyle.innerHTML = `.message-bubble, .msg-sent, .msg-received { background-color: rgba(45, 52, 54, 0.9) !important; color: white !important; }`;
    document.head.appendChild(msgStyle);
})();

// --- Initialize Theme Adaptive Styles (Login, Logout, Change Pass) ---
(function initThemeStyles() {
    const style = document.createElement('style');
    style.id = 'theme-adaptive-styles';
    style.innerHTML = `
        /* --- Default Dark Theme --- */
        #entry-overlay { background-color: #121212 !important; color: #ffffff !important; }
        #logout-modal > div, #change-pass-modal > div, #clear-chat-modal > div, .modal-box { background-color: #2d3436 !important; color: #ffffff !important; border: 1px solid rgba(255,255,255,0.1); }
        #entry-overlay input, #change-pass-modal input { background: rgba(255, 255, 255, 0.1) !important; color: white !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; }
        
        /* --- Light Theme Overrides --- */
        body.light-mode #entry-overlay { background-color: #f4f6f8 !important; color: #2c3e50 !important; }
        body.light-mode #logout-modal > div, body.light-mode #change-pass-modal > div, body.light-mode #clear-chat-modal > div, body.light-mode .modal-box { 
            background-color: #ffffff !important; 
            color: #2c3e50 !important; 
            border: 1px solid #e1e4e8 !important; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important; 
        }
        body.light-mode #entry-overlay input, body.light-mode #change-pass-modal input { 
            background: #ffffff !important; 
            color: #333333 !important; 
            border: 1px solid #ced4da !important; 
        }
        body.light-mode #entry-overlay input::placeholder, body.light-mode #change-pass-modal input::placeholder { color: #6c757d !important; }
        body.light-mode #cancelLogout, body.light-mode #cancelChangePass, body.light-mode #cancelClearChat { background-color: #e9ecef !important; color: #495057 !important; }
    `;
    document.head.appendChild(style);

    // --- Call UI Theme Styles ---
    const callStyle = document.createElement('style');
    callStyle.id = 'call-ui-styles';
    callStyle.innerHTML = `
        #call-overlay .call-header, #call-overlay .call-footer {
            position: absolute; left: 0; width: 100%; display: flex; align-items: center;
            padding: 15px; box-sizing: border-box; z-index: 10;
            background: rgba(0, 0, 0, 0.3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            color: white;
        }
        #call-overlay .call-header { top: 0; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        #call-overlay .call-header > * { flex-shrink: 0; }
        #call-overlay .call-header > :nth-child(2) { flex-grow: 1; text-align: center; }
        #call-overlay .call-footer { bottom: 0; justify-content: space-between; border-top: 1px solid rgba(255, 255, 255, 0.1); padding: 10px 20px; width: 100%; box-sizing: border-box; }
        #call-overlay .call-footer button {
            width: clamp(35px, 12vw, 50px); height: clamp(35px, 12vw, 50px); border-radius: 50%; background: rgba(255, 255, 255, 0.2);
            border: none; font-size: clamp(16px, 5vw, 22px); color: white; display: flex; align-items: center; justify-content: center;
            cursor: pointer; flex-shrink: 0;
        }
        #callEndBtn { background-color: #ff4757 !important; }
        #callRemoteVideo { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
        #callLocalVideo {
            position: absolute; top: 80px; right: 15px;
            width: clamp(100px, 25vw, 140px); height: clamp(150px, 40vw, 210px);
            border: 2px solid rgba(255, 255, 255, 0.7); border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3); object-fit: cover; z-index: 11;
            cursor: move; background-color: #000;
            transition: top 0.3s ease, left 0.3s ease, right 0.3s ease, bottom 0.3s ease;
        }
        /* Light Theme */
        body.light-mode #call-overlay .call-header, body.light-mode #call-overlay .call-footer {
            background: rgba(245, 245, 245, 0.8); color: #333; border-color: rgba(0, 0, 0, 0.1);
        }
        body.light-mode #call-overlay .call-footer button { background: rgba(0, 0, 0, 0.08); color: #333; }
        body.light-mode #callEndBtn { background-color: #e74c3c !important; color: white !important; }
        body.light-mode #callLocalVideo { border-color: rgba(0, 0, 0, 0.4); }

        /* Custom PiP View Styles */
        #custom-pip-view {
            position: fixed;
            width: 160px; height: 240px;
            background-color: #2d3436;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.4);
            z-index: 1001;
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.2);
            /* For draggable positioning */
            bottom: 75px; right: 15px; top: auto; left: auto;
            transition: left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease;
            cursor: move;
        }
        #custom-pip-view .pip-control-btn { background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 5px; }
        #custom-pip-view .pip-end-call { background: #ff4757; width: 35px; height: 35px; border-radius: 50%; font-size: 16px; display: flex; align-items: center; justify-content: center; }
        #pip-header, #pip-footer { background: rgba(0,0,0,0.3); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); flex-shrink: 0; }
        
        /* Light Theme for PiP */
        body.light-mode #custom-pip-view { background-color: #f1f2f6; border-color: rgba(0,0,0,0.1); }
        body.light-mode #pip-header, body.light-mode #pip-footer { background: rgba(255,255,255,0.7); color: #333; }
        body.light-mode #custom-pip-view .pip-control-btn { color: #333; }
        body.light-mode #custom-pip-view .pip-end-call { background: #e74c3c; color: white; }
    `;
    document.head.appendChild(callStyle);
})();

let cameraStream = null;
let currentFacingMode = 'environment';
let isFlashOn = false;
let currentImageBase64 = null;
let currentVideoBase64 = null;
let currentFileData = null;
let cropper = null;
let baseImageForFilter = null;
let currentFilterMode = 0; // 0:None, 1:Gray, 2:Sepia, 3:Invert

// Define Admin Usernames from Config (or defaults)
const ALPHA_ADMIN = (typeof envUserNames !== 'undefined') ? envUserNames.alpha : "Raushan_143";
const BETA_ADMIN = (typeof envUserNames !== 'undefined') ? envUserNames.beta : "Nisha_143";

const users = (typeof envUsers !== 'undefined') ? envUsers : { [ALPHA_ADMIN]: "asdf@1234", [BETA_ADMIN]: "11041805143" };

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
if (db) {
    db.ref(".info/connected").on("value", (snap) => {
        if (snap.val() === true) {
            console.log("✅ Firebase Realtime Database Connected!");
        } else {
            console.log("❌ Firebase Disconnected (or connecting...)");
        }
    });

    db.ref(".info/serverTimeOffset").on("value", (snap) => {
        serverTimeOffset = snap.val();
    });
}
let serverTimeOffset = 0;

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
let isSpeakerOn = false;
let pipIsDragging = false;
let pipStartX = 0;
let peerConnection = null;
let incomingSignalData = null;
let currentChatHistory = [];
let candidateQueue = [];
let amICaller = false;
let ringingTimeout = null;
let isCallConnected = false;
let toastTimeout = null;

// --- Set Custom Background ---
body.style.background = "none";

// Create blurred background overlay
let bgOverlay = document.getElementById('blur-bg-overlay');
if (!bgOverlay) {
    bgOverlay = document.createElement('div');
    bgOverlay.id = 'blur-bg-overlay';
    bgOverlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;
        filter: blur(8px); transform: scale(1.1);
    `;

    document.body.appendChild(bgOverlay);
}

let bgImage = document.getElementById('theme-bg-image');
if (!bgImage && bgOverlay) {
    bgImage = document.createElement('img');
    bgImage.id = 'theme-bg-image';
    bgImage.style.cssText = 'width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;';
    bgOverlay.appendChild(bgImage);
    bgImage.src = 'Dark Theme.jpg';
}

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

// --- Dynamic Edit Modal Creation ---
(function createEditModal() {
    if (!document.getElementById('edit-msg-modal')) {
        const modal = document.createElement('div');
        modal.id = 'edit-msg-modal';
        modal.className = 'modal-overlay'; 
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '1000';
        
        modal.innerHTML = `
            <div class="modal-box" style="background: #2d3436; padding: 20px; border-radius: 15px; width: 85%; max-width: 400px; text-align: center; color: white;">
                <h3 style="margin-bottom: 15px;">Edit Message</h3>
                <textarea id="editMsgInput" style="width: 100%; height: 100px; margin-bottom: 15px; padding: 10px; border-radius: 8px; border: none; background: rgba(255,255,255,0.1); color: white; resize: none;"></textarea>
                <div class="modal-actions" style="display: flex; justify-content: space-between;">
                    <button id="cancelEditMsg" style="padding: 10px 20px; border: none; border-radius: 8px; background: #ff4757; color: white; cursor: pointer; width: 45%;">Cancel</button>
                    <button id="confirmEditMsg" style="padding: 10px 20px; border: none; border-radius: 8px; background: #2ecc71; color: white; cursor: pointer; width: 45%;">Send</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('cancelEditMsg').addEventListener('click', () => {
            modal.style.display = 'none';
            if (mainContent) mainContent.classList.remove('blur-content');
        });

        document.getElementById('confirmEditMsg').addEventListener('click', () => {
            const newText = document.getElementById('editMsgInput').value.trim();
            if (selectedMsgId && newText !== "") {
                const m = currentChatHistory.find(x => x.id === selectedMsgId);
                if (m) {
                    const table = getMessageTable(m.sender);
                    db.ref(`messages/${table}/${selectedMsgId}`).update({ text: newText });
                }
            }
            modal.style.display = 'none';
            if (mainContent) mainContent.classList.remove('blur-content');
        });
    }
})();

// --- Dynamic Call UI Structure ---
(function setupCallUI() {
    const overlay = document.getElementById('call-overlay');
    if (!overlay) return;

    // 1. Create Header
    let header = overlay.querySelector('.call-header');
    if (!header) {
        header = document.createElement('div');
        header.className = 'call-header';
        
        const status = document.getElementById('callStatusText');
        const timer = document.getElementById('callTimer');
        const pipBtn = document.getElementById('callPipBtn');
        
        if (status) header.appendChild(status);
        if (timer) header.appendChild(timer);
        if (pipBtn) header.appendChild(pipBtn);
        
        overlay.prepend(header);
    }

    // 2. Create Footer
    let footer = overlay.querySelector('.call-footer');
    if (!footer) {
        footer = document.createElement('div');
        footer.className = 'call-footer';
        
        const buttons = [
            document.getElementById('callAudioOutputBtn'), document.getElementById('callMuteBtn'),
            document.getElementById('callVideoMuteBtn'), document.getElementById('callFlipBtn'),
            document.getElementById('callEndBtn')
        ];
        buttons.forEach(btn => { if (btn) footer.appendChild(btn); });
        overlay.appendChild(footer);
    }

    // 3. Ensure local video is a direct child for absolute positioning
    const localVideo = document.getElementById('callLocalVideo');
    const videoContainer = document.getElementById('callVideoContainer');
    if (localVideo && videoContainer && localVideo.parentElement === videoContainer) {
        overlay.appendChild(localVideo);
    }
})();

// --- Dynamic Custom PiP View ---
(function createCustomPipView() {
    if (document.getElementById('custom-pip-view')) return;

    const pipView = document.createElement('div');
    pipView.id = 'custom-pip-view';
    
    pipView.innerHTML = `
        <div id="pip-header" style="padding: 5px 8px; text-align: center; color: white; font-size: 12px; cursor: move; display: flex; justify-content: space-between; align-items: center;">
            <span id="pip-title">Video Call</span>
            <button id="pip-expand-btn" title="Expand" style="background:none; border:none; color:white; font-size:14px; cursor:pointer;">&#x26F6;</button>
        </div>
        <video id="pip-remote-video" playsinline autoplay style="width: 100%; height: 100%; object-fit: cover; flex-grow: 1; background: #111;"></video>
        <div id="pip-audio-placeholder" style="display:none; flex-grow: 1; align-items: center; justify-content: center; background: #2d3436; width: 100%; height: 100%;">
            <img src="" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.2);">
        </div>
        <div id="pip-footer" style="display: flex; justify-content: space-around; align-items: center; padding: 5px 8px;">
            <button id="pip-speaker-btn" class="pip-control-btn">🔊</button>
            <button id="pip-end-btn" class="pip-control-btn pip-end-call">📞</button>
            <button id="pip-mute-btn" class="pip-control-btn">🎤</button>
        </div>
    `;
    document.body.appendChild(pipView);

    function expandToFullScreen() {
        if (pipView.style.display === 'flex') {
            pipView.style.display = 'none';
            callOverlay.style.display = 'flex';
            mainContent.style.display = 'none';
            chatInputBar.style.display = 'none';
        }
    }

    // Event listeners for controls
    document.getElementById('pip-expand-btn').addEventListener('click', expandToFullScreen);
    document.getElementById('pip-remote-video').addEventListener('dblclick', expandToFullScreen);

    document.getElementById('pip-speaker-btn').addEventListener('click', (e) => { e.stopPropagation(); callAudioOutputBtn.click(); });
    document.getElementById('pip-end-btn').addEventListener('click', (e) => { e.stopPropagation(); callEndBtn.click(); });
    document.getElementById('pip-mute-btn').addEventListener('click', (e) => { e.stopPropagation(); callMuteBtn.click(); });

    // Draggable Logic
    let isDragging = false;
    let startX, startY, initialX, initialY;

    function dragStart(e) {
        if (e.target.tagName === 'BUTTON') return;
        isDragging = true;
        const rect = pipView.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        startX = clientX;
        startY = clientY;
        initialX = rect.left;
        initialY = rect.top;
        pipView.style.transition = 'none';
        pipView.style.right = 'auto';
        pipView.style.bottom = 'auto';
    }

    function dragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const dx = clientX - startX;
        const dy = clientY - startY;
        
        let newX = initialX + dx;
        let newY = initialY + dy;

        // Boundary Checks
        newX = Math.max(0, Math.min(newX, window.innerWidth - pipView.offsetWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - pipView.offsetHeight));

        pipView.style.left = `${newX}px`;
        pipView.style.top = `${newY}px`;
    }

    function dragEnd() {
        if (isDragging) {
            isDragging = false;
            pipView.style.transition = 'left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease';
        }
    }

    pipView.addEventListener('mousedown', dragStart);
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', dragEnd);
    
    pipView.addEventListener('touchstart', dragStart, { passive: false });
    window.addEventListener('touchmove', dragMove, { passive: false });
    window.addEventListener('touchend', dragEnd);
})();

// --- Dynamic Preview Close Button ---
(function createPreviewCloseBtn() {
    const overlay = document.getElementById('image-preview-overlay');
    if (overlay && !document.getElementById('closePreviewBtn')) {
        const closeBtn = document.createElement('button');
        closeBtn.id = 'closePreviewBtn';
        closeBtn.innerHTML = '✖';
        closeBtn.style.cssText = 'position: absolute; top: 20px; right: 20px; background: rgba(0, 0, 0, 0.5); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; z-index: 1001; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px);';
        
        overlay.appendChild(closeBtn);
        
        closeBtn.addEventListener('click', () => {
            if (cropper) {
                cropper.destroy();
                cropper = null;
                resetCropButton();
            }
            overlay.style.display = 'none';
            currentImageBase64 = null;
            previewImage.src = '';
            baseImageForFilter = null;
            currentFilterMode = 0;
            currentFileData = null;
            currentVideoBase64 = null;
            
            const info = document.getElementById('file-preview-info');
            if(info) info.style.display = 'none';
            
            const vidPreview = document.getElementById('previewVideo');
            if(vidPreview) {
                vidPreview.pause();
                vidPreview.style.display = 'none';
            }
        });
    }
})();

function triggerShake(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (toast) {
        toast.innerText = message;
        toast.classList.add("show");
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
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
            
            const msg = currentChatHistory.find(m => m.id === id);

            // --- Download Button Logic ---
            let downloadBtn = document.getElementById('downloadMsgOptionBtn');
            
            if (!downloadBtn && pinMsgBtn && pinMsgBtn.parentNode) {
                downloadBtn = document.createElement('button');
                downloadBtn.id = 'downloadMsgOptionBtn';
                downloadBtn.innerHTML = '💾 Save File';
                downloadBtn.className = pinMsgBtn.className;
                downloadBtn.style.marginBottom = '10px';
                downloadBtn.style.width = '100%';
                downloadBtn.style.background = 'rgba(46, 204, 113, 0.15)';
                downloadBtn.style.color = '#2ecc71';
                downloadBtn.style.border = '1px solid rgba(46, 204, 113, 0.3)';
                
                pinMsgBtn.parentNode.insertBefore(downloadBtn, pinMsgBtn);
                
                downloadBtn.addEventListener('click', async () => {
                    const m = currentChatHistory.find(x => x.id === selectedMsgId);
                    if (m) {
                        let dUrl = '', dName = '';
                        if (m.file) { 
                            dUrl = m.file.data; 
                            dName = m.file.name; 
                        } else if (m.image) { 
                            dUrl = m.image; 
                            dName = `image_${Date.now()}.jpg`; 
                        } else if (m.video) { 
                            dUrl = m.video; 
                            dName = `video_${Date.now()}.mp4`; 
                        } else if (m.audio) { 
                            dUrl = m.audio; 
                            dName = `audio_${Date.now()}.webm`; 
                        }
                        
                        if (dUrl) {
                            let useFallback = true;
                            if (window.showSaveFilePicker) {
                                try {
                                    const res = await fetch(dUrl);
                                    const blob = await res.blob();
                                    const handle = await window.showSaveFilePicker({
                                        suggestedName: dName,
                                    });
                                    const writable = await handle.createWritable();
                                    await writable.write(blob);
                                    await writable.close();
                                    useFallback = false;
                                } catch (err) {
                                    if (err.name === 'AbortError') useFallback = false;
                                }
                            }
                            if (useFallback) {
                                const a = document.createElement('a');
                                a.href = dUrl;
                                a.download = dName;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                            }
                        }
                    }
                    closeOptionsModal();
                });
            }
            
            if (downloadBtn) {
                if (msg && (msg.file || msg.image || msg.video || msg.audio)) {
                    downloadBtn.style.display = 'block';
                } else {
                    downloadBtn.style.display = 'none';
                }
            }

            // --- Unsend Receipt Button Logic ---
            let unsendBtn = document.getElementById('unsendMsgOptionBtn');
            
            if (!unsendBtn && pinMsgBtn && pinMsgBtn.parentNode) {
                unsendBtn = document.createElement('button');
                unsendBtn.id = 'unsendMsgOptionBtn';
                unsendBtn.innerHTML = '👁️ Unsend Receipt';
                unsendBtn.className = pinMsgBtn.className;
                unsendBtn.style.marginBottom = '10px';
                unsendBtn.style.width = '100%';
                
                let refNode = pinMsgBtn.nextSibling;
                pinMsgBtn.parentNode.insertBefore(unsendBtn, refNode);
                
                unsendBtn.addEventListener('click', () => {
                    const m = currentChatHistory.find(x => x.id === selectedMsgId);
                    if (m) {
                        const table = getMessageTable(m.sender);
                        db.ref(`messages/${table}/${m.id}/status`).set('sent');
                        db.ref(`messages/${table}/${m.id}/seenTimestamp`).remove();
                    }
                    closeOptionsModal();
                });
            }
            
            if (unsendBtn) {
                if (msg && msg.status === 'seen' && msg.sender === currentUser) {
                    unsendBtn.style.display = 'block';
                } else {
                    unsendBtn.style.display = 'none';
                }
            }

            // --- Edit Message Button Logic ---
            let editBtn = document.getElementById('editMsgOptionBtn');
            
            if (!editBtn && deleteMsgOptionBtn && deleteMsgOptionBtn.parentNode) {
                editBtn = document.createElement('button');
                editBtn.id = 'editMsgOptionBtn';
                editBtn.innerHTML = '✏️ Edit Message';
                editBtn.className = pinMsgBtn.className;
                editBtn.style.marginBottom = '10px';
                editBtn.style.width = '100%';
                
                deleteMsgOptionBtn.parentNode.insertBefore(editBtn, deleteMsgOptionBtn);
                
                editBtn.addEventListener('click', () => {
                    const m = currentChatHistory.find(x => x.id === selectedMsgId);
                    if (m) {
                        const editModal = document.getElementById('edit-msg-modal');
                        const editInput = document.getElementById('editMsgInput');
                        if (editModal && editInput) {
                            editInput.value = m.text || "";
                            editModal.style.display = 'flex';
                            mainContent.classList.add('blur-content');
                        }
                    }
                    closeOptionsModal();
                });
            }
            
            if (editBtn) {
                if (msg && msg.sender === currentUser && msg.text) {
                    editBtn.style.display = 'block';
                } else {
                    editBtn.style.display = 'none';
                }
            }
            // ---------------------------

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
    
    let displayText = msg.text;
    if (!displayText) {
        if (msg.image) displayText = '📷 Image';
        else if (msg.video) displayText = '🎥 Video';
        else if (msg.audio) displayText = '🎤 Audio';
        else if (msg.file) displayText = '📄 File';
    }
    replyText.innerText = displayText;
    msgInput.focus();
}

function getMessageTable(sender) {
    return sender === ALPHA_ADMIN ? 'alpha' : 'beta';
}

function getUserRole(username) {
    return username === ALPHA_ADMIN ? 'Alpha' : 'Beta';
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
            if (!data || data.type === 'reject') {
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
                    if (data && data.type === 'reject') {
                        showToast("🚫 Call Rejected");
                    }
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
    const otherUser = currentUser === ALPHA_ADMIN ? BETA_ADMIN : ALPHA_ADMIN;
    const otherRole = currentUser === ALPHA_ADMIN ? 'Beta' : 'Alpha';
    
    let otherUserHeartbeat = 0;
    let otherUserLastSeen = null;
    let isOtherUserTyping = false;

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
        updateStatusUI(isOnline, displayLastSeen, isOtherUserTyping);
    }, 500);

    // 5. Typing Listener (Other User)
    db.ref(`typing/${otherUser}`).on('value', snapshot => {
        isOtherUserTyping = snapshot.val();
    });

    // 6. Profile Picture Listener (Load saved photo)
    const userRole = getUserRole(currentUser);
    db.ref(`Profile Pic/${userRole}_Profile_Pic`).on('value', snapshot => {
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
        
        // Render Video if exists
        if (msg.video) {
            const vidDiv = document.createElement('div');
            vidDiv.className = 'msg-video-wrapper';
            vidDiv.style.cssText = 'position: relative; display: inline-block; cursor: pointer; margin: 5px 0;';
            
            const vidThumb = document.createElement('video');
            vidThumb.src = msg.video;
            vidThumb.style.cssText = 'max-width: 200px; max-height: 200px; border-radius: 8px; object-fit: cover; background: #000;';
            vidThumb.preload = 'metadata'; // Load first frame
            
            const iconOverlay = document.createElement('div');
            iconOverlay.innerHTML = '▶';
            iconOverlay.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: rgba(0,0,0,0.6); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; pointer-events: none; border: 2px solid white;';
            
            vidDiv.appendChild(vidThumb);
            vidDiv.appendChild(iconOverlay);
            vidDiv.onclick = () => openVideoViewer(msg.video);
            msgDiv.appendChild(vidDiv);
        }
        
        // Render Audio if exists
        if (msg.audio) {
            const audio = document.createElement('audio');
            audio.src = msg.audio;
            audio.controls = true;
            audio.className = 'msg-audio';
            msgDiv.appendChild(audio);
        }
        
        // Render File if exists
        if (msg.file) {
            const fileDiv = document.createElement('div');
            fileDiv.style.cssText = 'background: rgba(0,0,0,0.1); padding: 10px; border-radius: 8px; margin: 5px 0; max-width: 200px;';
            fileDiv.innerHTML = `
                <a href="${msg.file.data}" download="${msg.file.name}" style="text-decoration:none; color:inherit; display:flex; align-items:center; gap:10px;">
                    <span style="font-size:24px">📄</span>
                    <div style="overflow:hidden;">
                        <div style="font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${msg.file.name}</div>
                        <div style="font-size:10px; opacity:0.7;">Tap to Download</div>
                    </div>
                </a>
            `;
            msgDiv.appendChild(fileDiv);
        }

        if (msg.text) {
            const textSpan = document.createElement('span');
            // Escape HTML to prevent XSS
            const escapedText = msg.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            // Linkify URLs
            const linkedText = escapedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #00a8ff; text-decoration: underline;">$1</a>');
            textSpan.innerHTML = linkedText;
            msgDiv.appendChild(textSpan);
        }

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

        if (currentUser === ALPHA_ADMIN) {
            profileUsernameDisplay.innerText = '💎_Alpha_💎';
            logoDisplay.innerText = '💎_Alpha_💎';
            body.classList.add('user-alpha');
            body.classList.remove('user-beta');
        } else if (currentUser === BETA_ADMIN) {
            profileUsernameDisplay.innerText = '💎_Beta_💎';
            logoDisplay.innerText = '💎_Beta_💎';
            body.classList.add('user-beta');
            body.classList.remove('user-alpha');
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
    const userRole = currentUser === ALPHA_ADMIN ? 'Alpha' : 'Beta';
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

function updateStatusUI(isOnline, lastSeen, isTyping) {
    userStatusIndicator.style.display = 'none';

    // Increase text size and move right
    lastSeenDisplay.style.marginLeft = '1px';

    if (isTyping) {
        lastSeenDisplay.innerText = "Typing...";
        lastSeenDisplay.style.fontSize = '0.9rem';
        lastSeenDisplay.style.marginLeft = '34px';
        lastSeenDisplay.style.display = 'block';
        lastSeenDisplay.style.color = '#2ecc71';
        return;
    }

    if (isOnline === true || lastSeen === "Active") {
        lastSeenDisplay.innerText = "Online";
        lastSeenDisplay.style.fontSize = '0.9rem';
        lastSeenDisplay.style.marginLeft = '34px';
        lastSeenDisplay.style.display = 'block';
        lastSeenDisplay.style.color = '#2ecc71';
    } else {
        lastSeenDisplay.style.color = '';
        lastSeenDisplay.style.fontSize = '0.60rem';
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
        menuIconBtn.classList.remove('rotate');
    } else {
        menuOptions.style.display = 'flex';
        menuIconBtn.classList.add('rotate');
        
        // Apply 70% Blur/Glass Effect to Menu
        menuOptions.style.cssText = `
            display: flex; flex-direction: column; position: fixed; top: 65px; right: 10px;
            background: rgba(44, 62, 80, 0.9); backdrop-filter: blur(70px); -webkit-backdrop-filter: blur(90px);
            border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 10px;
            z-index: 2000; min-width: 160px; gap: 5px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            color: white;
        `;

        // Ensure text is white in both modes
        Array.from(menuOptions.children).forEach(child => child.style.color = 'white');
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuIconBtn.contains(e.target) && !menuOptions.contains(e.target)) {
        menuOptions.style.display = 'none';
        menuIconBtn.classList.remove('rotate');
    }
});

// --- Theme Toggle Logic ---
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    
    themeToggleBtn.innerText = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';

    // Switch Message Bubble Background
    let msgStyle = document.getElementById('dynamic-msg-style');
    if (!msgStyle) {
        msgStyle = document.createElement('style');
        msgStyle.id = 'dynamic-msg-style';
        document.head.appendChild(msgStyle);
    }
    // Light Mode -> All Bubbles Blue | Dark Mode -> All Bubbles Gray
    const bubbleColor = isLight ? 'rgba(0, 123, 255, 0.85)' : 'rgba(45, 52, 54, 0.9)';
    msgStyle.innerHTML = `.message-bubble, .msg-sent, .msg-received { background-color: ${bubbleColor} !important; color: white !important; }`;

    // Switch background image based on theme
    if (bgOverlay) {
        let bgImage = document.getElementById('theme-bg-image');

        if (!bgImage) {
            bgImage = document.createElement('img');
            bgImage.id = 'theme-bg-image';
            bgImage.style.cssText = 'width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;';
            bgOverlay.appendChild(bgImage);
        }

        bgOverlay.style.backgroundImage = 'none';
        bgImage.src = isLight ? 'Light Theme.jpg' : 'Dark Theme.jpg';
    }
});

// --- Clear Chat Logic ---
clearChatBtn.addEventListener('click', () => {
    menuOptions.style.display = 'none';
    menuIconBtn.classList.remove('rotate');
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
    menuIconBtn.classList.remove('rotate');
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
    menuIconBtn.classList.remove('rotate');
    profileModal.style.display = 'flex';
    mainContent.classList.add('blur-content');

    // --- UI Updates for Profile Modal ---
    // 1. Close Button Position
    if (closeProfileBtn.parentNode) {
        closeProfileBtn.parentNode.style.position = 'relative';
    }
    closeProfileBtn.style.position = 'absolute';
    closeProfileBtn.style.top = '15px';
    closeProfileBtn.style.right = '15px';
    closeProfileBtn.innerHTML = '❌';

    // --- Fresh Button Logic (Change & Save) ---
    if (uploadTriggerBtn) {
        uploadTriggerBtn.style.display = 'block';
        uploadTriggerBtn.innerText = "Change";
        uploadTriggerBtn.style.background = "#4facfe"; // Light Blue
        uploadTriggerBtn.style.color = "white";
        uploadTriggerBtn.style.width = "48%";
        uploadTriggerBtn.style.border = "none";
    }

    let saveBtn = document.getElementById('saveProfileBtn');
    if (!saveBtn) {
        // Container for buttons
        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.justifyContent = 'space-between';
        btnContainer.style.marginTop = '15px';
        btnContainer.style.width = '100%';

        if (uploadTriggerBtn && uploadTriggerBtn.parentNode) {
            uploadTriggerBtn.parentNode.insertBefore(btnContainer, uploadTriggerBtn);
            btnContainer.appendChild(uploadTriggerBtn);
        }

        saveBtn = document.createElement('button');
        saveBtn.id = 'saveProfileBtn';
        saveBtn.innerText = "Save";
        saveBtn.className = uploadTriggerBtn ? uploadTriggerBtn.className : '';
        saveBtn.style.background = "#0052D4"; // Deep Blue
        saveBtn.style.color = "white";
        saveBtn.style.width = "48%";
        saveBtn.style.border = "none";
        
        btnContainer.appendChild(saveBtn);

        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!currentUser) return alert("Please log in first.");
            const role = getUserRole(currentUser);
            db.ref(`Profile Pic/${role}_Profile_Pic`).set(profileImageDisplay.src)
                .then(() => alert("Profile Picture Saved Successfully!"))
                .catch(err => alert("Failed to save: " + err.message));
        });
    }
});

closeProfileBtn.addEventListener('click', () => {
    profileModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
});

// Trigger file input when Change button is clicked
uploadTriggerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    profileFileInput.click();
});

// Handle profile picture selection
profileFileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImageDisplay.src = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
    }
});

// Typing detection
msgInput.addEventListener('input', () => {
    const text = msgInput.value.trim();
    // Toggle Mic / Send
    if (text.length > 0) {
        if (micBtn) micBtn.style.display = 'none';
        if (sendMsgBtn) sendMsgBtn.style.display = 'flex';
        if (cameraBtn) cameraBtn.style.display = 'none';
    } else {
        if (micBtn) micBtn.style.display = 'flex';
        if (sendMsgBtn) sendMsgBtn.style.display = 'none';
        if (cameraBtn) cameraBtn.style.display = 'inline-block';
    }

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
        const recipient = currentUser === ALPHA_ADMIN ? BETA_ADMIN : ALPHA_ADMIN;
        const newMsg = {
            id: newMsgRef.key,
            sender: currentUser,
            recipient: recipient,
            text: text,
            timestamp: timeString,
            rawDate: rawDate,
            status: 'sent', // Initial status
            // Add reply info
            replyTo: replyToMsg ? (() => {
                const rText = replyToMsg.text || (replyToMsg.image ? '📷 Image' : (replyToMsg.video ? '🎥 Video' : (replyToMsg.audio ? '🎤 Audio' : (replyToMsg.file ? '📄 File' : 'Message'))));
                return {
                    sender: replyToMsg.sender,
                    text: rText
                };
            })() : null
        };
        newMsgRef.set(newMsg).catch(error => {
            console.error("Send Error:", error);
            alert("Failed to send message: " + error.message);
        });

        // Clear reply state
        replyToMsg = null;
        replyPreview.style.display = 'none';
        msgInput.value = '';
        
        // Reset Mic/Send State
        if (micBtn) micBtn.style.display = 'flex';
        if (sendMsgBtn) sendMsgBtn.style.display = 'none';
        if (cameraBtn) cameraBtn.style.display = 'inline-block';
    }
});

// --- Chat Actions (Attachment, Camera, Mic) ---
attachBtn.addEventListener('click', () => {
    chatFileInput.click();
    // Ensure we accept all files
    chatFileInput.removeAttribute('accept');
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
    currentFileData = null;
    currentVideoBase64 = null;
    
    // Stop camera and show preview
    stopCamera();
    
    // Show existing preview overlay
    previewImage.src = currentImageBase64;
    previewImage.style.display = 'block';
    
    // Show image controls (Crop & Filter) just like attachment preview
    cropBtn.style.display = 'flex';
    filterBtn.style.display = 'flex';

    // Hide file/video elements if they were visible
    const info = document.getElementById('file-preview-info');
    if(info) info.style.display = 'none';
    const vidPreview = document.getElementById('previewVideo');
    if(vidPreview) vidPreview.style.display = 'none';

    imagePreviewOverlay.style.display = 'flex';
});

// --- Call Logic (Audio/Video) ---

audioCallBtn.addEventListener('click', () => startCall(false));
videoCallBtn.addEventListener('click', () => startCall(true));

async function startCall(video, isIncoming = false) {
    menuOptions.style.display = 'none';
    menuIconBtn.classList.remove('rotate');
    isVideoCall = video;
    amICaller = !isIncoming;
    isCallConnected = false;

    // Reset local video position
    const localVideo = document.getElementById('callLocalVideo');
    if (localVideo) {
        localVideo.style.top = '80px';
        localVideo.style.left = 'auto';
        localVideo.style.right = '15px';
        localVideo.style.bottom = 'auto';
    }
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
    isSpeakerOn = false;
    callAudioOutputBtn.innerText = '🔊';
    callAudioOutputBtn.style.background = 'rgba(255,255,255,0.2)';
    
    // Check if audio output switching is supported
    if (typeof callRemoteAudio.setSinkId !== 'function') {
        callAudioOutputBtn.style.display = 'none';
    } else {
        callAudioOutputBtn.style.display = 'flex';
    }

    // Configure UI based on call type
    if (video) {
        callVideoContainer.style.display = 'block';
        callAudioContainer.style.display = 'none';
        callRemoteVideo.style.display = 'block';
        callFlipBtn.style.display = 'flex';
        callVideoMuteBtn.style.display = 'flex';
        callFacingMode = 'user';
        if (callLocalVideo) callLocalVideo.style.display = 'block';
    } else {
        callVideoContainer.style.display = 'none';
        callAudioContainer.style.display = 'flex';
        callRemoteVideo.style.display = 'none';
        callFlipBtn.style.display = 'none';
        callVideoMuteBtn.style.display = 'none';
        if (callLocalVideo) callLocalVideo.style.display = 'none';

        // Fetch and display target user's profile picture
        const targetUser = currentUser === ALPHA_ADMIN ? BETA_ADMIN : ALPHA_ADMIN;
        const targetRole = getUserRole(targetUser);
        
        db.ref(`Profile Pic/${targetRole}_Profile_Pic`).once('value').then(snap => {
            const pic = snap.val();
            const audioImg = callAudioContainer.querySelector('img');
            if (audioImg) {
                audioImg.src = pic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
            }
        });
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
        
        // Initialize Audio Output (Default to Earpiece)
        updateAudioOutput();
        
        if (video) {
            callStream.getVideoTracks().forEach(t => t.enabled = true);
            callLocalVideo.srcObject = callStream;
            callLocalVideo.style.transform = 'scaleX(-1)'; // Mirror local
        }

        // 3. Initiate Connection if Caller
        if (!isIncoming) {
            createPeerConnection(true);
            
            // 10 Seconds Ringing Timeout
            if (ringingTimeout) clearTimeout(ringingTimeout);
            ringingTimeout = setTimeout(() => {
                endCall(); 
            }, 10000);
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
        updateAudioOutput();
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
    const targetUser = currentUser === ALPHA_ADMIN ? BETA_ADMIN : ALPHA_ADMIN;
    const targetRole = getUserRole(targetUser);
    const callType = isVideoCall ? 'Video' : 'Audio';
    
    // Paths
    const incomingPath = `signals/${targetRole}_incoming_${callType}`; // Where I write offers
    const myIncomingPath = `signals/${myRole}_incoming_${callType}`; // Where I write answers (if I am receiver)
    const candidatePath = `signals/${targetRole}_candidates`;

    if (type === 'offer') {
        const ref = db.ref(incomingPath);
        ref.set({
            type: 'offer',
            sender: currentUser,
            sdp: JSON.parse(JSON.stringify(data)),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        ref.onDisconnect().remove();
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
        
        // Show Caller Profile Picture
        const callerRole = getUserRole(signal.sender);
        db.ref(`Profile Pic/${callerRole}_Profile_Pic`).once('value').then(snap => {
            const pic = snap.val();
            
            // Target the existing image in the HTML instead of creating a new one
            const existingImg = document.querySelector('#incoming-call-modal .profile-pic img');
            
            // Clean up: Remove any rogue images directly inside the modal box (artifacts from old code)
            const modalBox = document.querySelector('#incoming-call-modal .modal-box');
            if (modalBox) {
                const rogueImages = modalBox.querySelectorAll(':scope > img');
                rogueImages.forEach(img => img.remove());
                const oldIdImg = document.getElementById('incomingCallImage');
                if (oldIdImg) oldIdImg.remove();
            }

            if (existingImg) {
                existingImg.src = pic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
            }
        });

        incomingCallModal.style.display = 'flex';
        mainContent.classList.add('blur-content');
    } 
    // 2. Answer (Call Accepted)
    else if (signal.type === 'answer') {
        if (peerConnection && peerConnection.signalingState !== 'stable') {
            const desc = new RTCSessionDescription(signal.data);
            peerConnection.setRemoteDescription(desc)
                .then(() => {
                    if (ringingTimeout) clearTimeout(ringingTimeout);
                    isCallConnected = true;
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
                        isCallConnected = true;
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
        const targetUser = currentUser === ALPHA_ADMIN ? BETA_ADMIN : ALPHA_ADMIN;
        const targetRole = getUserRole(targetUser);
        const type = incomingSignalData.isVideo ? 'Video' : 'Audio';
        
        // Set global isVideoCall so endCall() targets the correct signal path
        isVideoCall = incomingSignalData.isVideo;

        // Send explicit reject signal so caller detects it
        db.ref(`signals/${targetRole}_incoming_${type}`).set({
            type: 'reject',
            sender: currentUser
        });
        
        // Delay cleanup slightly to ensure caller receives the reject signal
        setTimeout(() => {
            endCall(false); // This will clean up nodes via sendSignal('end')
        }, 500);
    } else {
        endCall(true);
    }
});

callEndBtn.addEventListener('click', () => endCall(false));

function endCall(remoteEnded = false) {
    // Clear Timeout
    if (ringingTimeout) {
        clearTimeout(ringingTimeout);
        ringingTimeout = null;
    }

    // Send Missed Call Message if I am caller, call wasn't connected, and it wasn't rejected remotely
    if (amICaller && !isCallConnected && !remoteEnded) {
        sendMissedCallMessage(isVideoCall);
    }

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
    
    const pipView = document.getElementById('custom-pip-view');
    if (pipView) pipView.style.display = 'none';

    incomingCallModal.style.display = 'none';
    mainContent.classList.remove('blur-content');
    if (currentUser) {
        mainContent.style.display = 'flex';
        chatInputBar.style.display = 'flex';
    }
    
    // 6. Clear Media Elements
    callRemoteVideo.srcObject = null;
    callRemoteAudio.srcObject = null;
    callLocalVideo.srcObject = null;
    
    candidateQueue = [];
    incomingSignalData = null;
    amICaller = false;
    isCallConnected = false;
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

function sendMissedCallMessage(isVideo) {
    const text = isVideo ? "📹 Missed Video Call" : "📞 Missed Audio Call";
    
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
    const recipient = currentUser === ALPHA_ADMIN ? BETA_ADMIN : ALPHA_ADMIN;
    
    newMsgRef.set({
        id: newMsgRef.key,
        sender: currentUser,
        recipient: recipient,
        text: text,
        timestamp: timeString,
        rawDate: rawDate,
        status: 'sent',
        replyTo: null
    });
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
            syncPipControls();
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

// --- Swap Video Feeds on Tap ---
function swapVideoFeeds() {
    if (!isVideoCall || !callLocalVideo.srcObject || !callRemoteVideo.srcObject) {
        return; // Only for video calls with both streams active
    }

    const localVideoSrc = callLocalVideo.srcObject;
    const remoteVideoSrc = callRemoteVideo.srcObject;

    // Swap the streams
    callLocalVideo.srcObject = remoteVideoSrc;
    callRemoteVideo.srcObject = localVideoSrc;

    // The element showing the local user's front-facing camera should be mirrored.
    // Reset transforms first.
    callLocalVideo.style.transform = 'none';
    callRemoteVideo.style.transform = 'none';

    // Re-apply mirroring to whichever element is now showing the local user's front-facing camera
    if (callFacingMode === 'user') {
        if (callLocalVideo.srcObject === callStream) {
            callLocalVideo.style.transform = 'scaleX(-1)';
        } else if (callRemoteVideo.srcObject === callStream) {
            callRemoteVideo.style.transform = 'scaleX(-1)';
        }
    }

    // Ensure playback continues
    callLocalVideo.play().catch(e => console.error("Local video play failed after swap:", e));
    callRemoteVideo.play().catch(e => console.error("Remote video play failed after swap:", e));
}

function syncPipControls() {
    const pipMuteBtn = document.getElementById('pip-mute-btn');
    const pipSpeakerBtn = document.getElementById('pip-speaker-btn');

    if (pipMuteBtn) {
        pipMuteBtn.innerText = isCallMuted ? '🔇' : '🎤';
    }
    if (pipSpeakerBtn) {
        pipSpeakerBtn.innerText = isSpeakerOn ? '👂' : '🔊';
    }
}

callFlipBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (callStream && isVideoCall) {
        callStream.getVideoTracks().forEach(t => t.stop());
        callFacingMode = callFacingMode === 'user' ? 'environment' : 'user';
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: callFacingMode }
            });
            const newVideoTrack = newStream.getVideoTracks()[0];
            
            // Replace track in Peer Connection
            const sender = peerConnection.getSenders().find(s => s.track && s.track.kind === 'video');
            if (sender) await sender.replaceTrack(newVideoTrack);

            // Update local callStream object
            const oldVideoTrack = callStream.getVideoTracks()[0];
            callStream.removeTrack(oldVideoTrack);
            callStream.addTrack(newVideoTrack);

            // Update mirroring on the correct element
            callLocalVideo.style.transform = 'none';
            callRemoteVideo.style.transform = 'none';
            if (callFacingMode === 'user') {
                if (callLocalVideo.srcObject === callStream) callLocalVideo.style.transform = 'scaleX(-1)';
                else if (callRemoteVideo.srcObject === callStream) callRemoteVideo.style.transform = 'scaleX(-1)';
            }
            
            // Restore Mute State
            if (newVideoTrack) newVideoTrack.enabled = !isVideoMuted;
        } catch (err) { console.error(err); }
    }
});

async function updateAudioOutput(isManual = false) {
    const element = isVideoCall ? callRemoteVideo : callRemoteAudio;
    
    if (typeof element.setSinkId !== 'function') {
        console.warn("Audio output switching not supported.");
        return;
    }
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const outputs = devices.filter(d => d.kind === 'audiooutput');
        if (!outputs.length) return;
        
        const speaker = outputs.find(d => /speaker/i.test(d.label));
        const earpiece = outputs.find(d => /earpiece|handset|receiver|phone/i.test(d.label));
        
        let targetId = 'default';
        if (isSpeakerOn) {
            if (speaker) targetId = speaker.deviceId;
        } else {
            if (earpiece) targetId = earpiece.deviceId;
            else if (speaker && outputs.length > 1) {
                const other = outputs.find(d => d.deviceId !== speaker.deviceId);
                if (other) targetId = other.deviceId;
            }
        }
        
        await element.setSinkId(targetId);
        callAudioOutputBtn.innerText = isSpeakerOn ? '👂' : '🔊';
        callAudioOutputBtn.style.background = isSpeakerOn ? '#ff9f43' : 'rgba(255,255,255,0.2)';
        syncPipControls();
    } catch(e) { console.error(e); }
}

callAudioOutputBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isSpeakerOn = !isSpeakerOn;
    updateAudioOutput(true);
});

// --- PiP Mode Logic ---
callPipBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    // Hide full screen call & show chat
    callOverlay.style.display = 'none';
    mainContent.style.display = 'flex';
    chatInputBar.style.display = 'flex';

    // Show and configure custom PiP view
    const pipView = document.getElementById('custom-pip-view');
    const pipVideo = document.getElementById('pip-remote-video');
    const pipAudio = document.getElementById('pip-audio-placeholder');
    const pipTitle = document.getElementById('pip-title');

    pipView.style.display = 'flex';
    
    if (isVideoCall) {
        if (pipTitle) pipTitle.innerText = "Video Call";
        pipVideo.style.display = 'block';
        if (pipAudio) pipAudio.style.display = 'none';
        pipVideo.srcObject = callRemoteVideo.srcObject;
    } else {
        if (pipTitle) pipTitle.innerText = "Audio Call";
        pipVideo.style.display = 'none';
        if (pipAudio) {
            pipAudio.style.display = 'flex';
            const targetUser = currentUser === ALPHA_ADMIN ? BETA_ADMIN : ALPHA_ADMIN;
            const targetRole = getUserRole(targetUser);
            db.ref(`Profile Pic/${targetRole}_Profile_Pic`).once('value').then(snap => {
                const pic = snap.val();
                const img = pipAudio.querySelector('img');
                if (img) img.src = pic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
            });
        }
    }
    
    syncPipControls();
});

// --- Draggable Local Video Logic ---
let localVideoIsDragging = false;
let localVideoDidMove = false;
let localVideoStartX = 0, localVideoStartY = 0;
let localVideoInitialX = 0, localVideoInitialY = 0;

const localVideoDraggable = document.getElementById('callLocalVideo');

function handleLocalVideoDragStart(e) {
    if (!callOverlay.style.display || callOverlay.style.display === 'none') return;
    e.preventDefault();
    localVideoIsDragging = true;
    localVideoDidMove = false; // Reset on start

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = localVideoDraggable.getBoundingClientRect();
    localVideoDraggable.style.right = 'auto';
    localVideoDraggable.style.bottom = 'auto';
    localVideoDraggable.style.left = `${rect.left}px`;
    localVideoDraggable.style.top = `${rect.top}px`;

    localVideoStartX = clientX;
    localVideoStartY = clientY;
    localVideoInitialX = rect.left;
    localVideoInitialY = rect.top;

    localVideoDraggable.style.transition = 'none';
}

function handleLocalVideoDragMove(e) {
    if (!localVideoIsDragging) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - localVideoStartX;
    const dy = clientY - localVideoStartY;

    // If moved more than a threshold, consider it a drag
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        localVideoDidMove = true;
    }

    let newX = localVideoInitialX + dx;
    let newY = localVideoInitialY + dy;

    const overlayRect = callOverlay.getBoundingClientRect();
    const videoRect = localVideoDraggable.getBoundingClientRect();
    const headerHeight = 70;
    const footerHeight = 80;

    newX = Math.max(5, Math.min(newX, overlayRect.width - videoRect.width - 5));
    newY = Math.max(headerHeight, Math.min(newY, overlayRect.height - videoRect.height - footerHeight));

    localVideoDraggable.style.left = `${newX}px`;
    localVideoDraggable.style.top = `${newY}px`;
}

function handleLocalVideoDragEnd() {
    if (!localVideoIsDragging) return;

    // If the video was not dragged, treat it as a tap/click to swap feeds
    if (!localVideoDidMove) {
        swapVideoFeeds();
    }

    localVideoIsDragging = false;
    localVideoDraggable.style.transition = 'top 0.3s ease, left 0.3s ease, right 0.3s ease, bottom 0.3s ease';
}

if (localVideoDraggable) {
    localVideoDraggable.addEventListener('mousedown', handleLocalVideoDragStart);
    localVideoDraggable.addEventListener('touchstart', handleLocalVideoDragStart, { passive: false });
}
window.addEventListener('mousemove', handleLocalVideoDragMove);
window.addEventListener('touchmove', handleLocalVideoDragMove, { passive: false });
window.addEventListener('mouseup', handleLocalVideoDragEnd);
window.addEventListener('touchend', handleLocalVideoDragEnd);

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
    const recipient = currentUser === ALPHA_ADMIN ? BETA_ADMIN : ALPHA_ADMIN;
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
        
        // Check if it is an image
        if (file.type.startsWith('image/')) {
            reader.onload = function(e) {
                currentImageBase64 = e.target.result;
                baseImageForFilter = currentImageBase64;
                currentFileData = null;
                currentVideoBase64 = null;
                currentFilterMode = 0;
                
                previewImage.src = currentImageBase64;
                previewImage.style.display = 'block';
                
                // Show image controls
                cropBtn.style.display = 'flex';
                filterBtn.style.display = 'flex';
                
                // Hide file info if exists
                const info = document.getElementById('file-preview-info');
                if(info) info.style.display = 'none';
                
                const vidPreview = document.getElementById('previewVideo');
                if(vidPreview) vidPreview.style.display = 'none';

                imagePreviewOverlay.style.display = 'flex';
            };
        } else if (file.type.startsWith('video/')) {
            // Check file size
            if (file.size > 20 * 1024 * 1024) {
                alert("Video is too large. Maximum size is 20MB.");
                event.target.value = '';
                return;
            }
            reader.onload = function(e) {
                currentVideoBase64 = e.target.result;
                currentImageBase64 = null;
                currentFileData = null;
                
                // Hide Image UI
                previewImage.style.display = 'none';
                cropBtn.style.display = 'none';
                filterBtn.style.display = 'none';
                const info = document.getElementById('file-preview-info');
                if(info) info.style.display = 'none';
                
                // Ensure send button is visible
                sendImageBtn.style.display = 'flex';

                // Show Video Preview
                let vidPreview = document.getElementById('previewVideo');
                if (!vidPreview) {
                    vidPreview = document.createElement('video');
                    vidPreview.id = 'previewVideo';
                    vidPreview.controls = true;
                    vidPreview.style.cssText = 'max-width: 100%; max-height: 60vh; border-radius: 10px;';
                    previewImage.parentNode.insertBefore(vidPreview, previewImage);
                }
                vidPreview.src = currentVideoBase64;
                vidPreview.style.display = 'block';
                
                imagePreviewOverlay.style.display = 'flex';
            };
        } else {
            // Handle generic files (PDF, DOC, APK, etc.)
            if (file.size > 20 * 1024 * 1024) {
                alert("File is too large. Maximum size is 20MB.");
                event.target.value = '';
                return;
            }
            reader.onload = function(e) {
                currentFileData = {
                    name: file.name,
                    type: file.type,
                    data: e.target.result
                };
                currentImageBase64 = null;
                currentVideoBase64 = null;
                
                // Hide image controls
                previewImage.style.display = 'none';
                cropBtn.style.display = 'none';
                filterBtn.style.display = 'none';
                
                let info = document.getElementById('file-preview-info');
                if(!info) {
                    info = document.createElement('div');
                    info.id = 'file-preview-info';
                    info.style.color = 'white';
                    info.style.textAlign = 'center';
                    info.style.marginTop = '50px';
                    // Insert before buttons
                    const container = document.querySelector('.preview-actions') || imagePreviewOverlay;
                    if(container === imagePreviewOverlay) container.insertBefore(info, previewImage);
                }
                info.style.display = 'block';
                
                const vidPreview = document.getElementById('previewVideo');
                if(vidPreview) vidPreview.style.display = 'none';
                
                info.innerHTML = `
                    <div style="font-size: 50px; margin-bottom: 10px;">📄</div>
                    <h3 style="word-break: break-all; max-width: 80vw;">${file.name}</h3>
                    <p>${(file.size/1024).toFixed(1)} KB</p>
                `;
                
                imagePreviewOverlay.style.display = 'flex';
            };
        }
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
    currentFileData = null;
    currentVideoBase64 = null;
    const info = document.getElementById('file-preview-info');
    if(info) info.style.display = 'none';
    
    const vidPreview = document.getElementById('previewVideo');
    if(vidPreview) {
        vidPreview.pause();
        vidPreview.style.display = 'none';
    }

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
    if (currentImageBase64 || currentFileData || currentVideoBase64) {
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
        const recipient = currentUser === ALPHA_ADMIN ? BETA_ADMIN : ALPHA_ADMIN;
        
        const msgData = {
            id: newMsgRef.key,
            sender: currentUser,
            recipient: recipient,
            text: '', 
            timestamp: timeString,
            rawDate: rawDate,
            status: 'sent',
            replyTo: null
        };

        if (currentImageBase64) {
            msgData.image = currentImageBase64;
        } else if (currentFileData) {
            msgData.file = currentFileData;
        } else if (currentVideoBase64) {
            msgData.video = currentVideoBase64;
        }

        newMsgRef.set(msgData).catch(err => {
            console.error("Send Error:", err);
            alert("Failed to send. File might be too large.");
        });

        // Cleanup
        imagePreviewOverlay.style.display = 'none';
        currentImageBase64 = null;
        currentFileData = null;
        currentVideoBase64 = null;
        const info = document.getElementById('file-preview-info');
        if(info) info.style.display = 'none';
        const vidPreview = document.getElementById('previewVideo');
        if(vidPreview) {
            vidPreview.pause();
            vidPreview.style.display = 'none';
        }
    }
});

// --- Image Viewer Logic (Zoom & Pan) ---

// Open Viewer
chatMessages.addEventListener('click', (e) => {
    if (e.target.classList.contains('msg-image')) {
        imageViewerModal.style.display = 'block';
        viewerImage.style.display = 'block';
        viewerImage.src = e.target.src;
        // Reset State
        viewerScale = 1;
        viewerTranslateX = 0;
        viewerTranslateY = 0;
        zoomSlider.value = 1;
        updateViewerTransform();
        
        // Hide video if present
        const v = document.getElementById('viewerVideoElement');
        if(v) v.style.display = 'none';
    }
});

function openVideoViewer(src) {
    imageViewerModal.style.display = 'block';
    viewerImage.style.display = 'none';
    
    let viewerVideo = document.getElementById('viewerVideoElement');
    if (!viewerVideo) {
        viewerVideo = document.createElement('video');
        viewerVideo.id = 'viewerVideoElement';
        viewerVideo.controls = true;
        viewerVideo.style.cssText = 'max-width: 100%; max-height: 80vh; display: block; margin: auto;';
        viewerImage.parentNode.insertBefore(viewerVideo, viewerImage);
    }
    viewerVideo.src = src;
    viewerVideo.style.display = 'block';
    viewerVideo.play();
}

// Close Viewer
closeViewerBtn.addEventListener('click', () => {
    imageViewerModal.style.display = 'none';
    const v = document.getElementById('viewerVideoElement');
    if(v) {
        v.pause();
        v.src = '';
    }
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
    menuIconBtn.classList.remove('rotate');
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
    body.classList.remove('user-alpha', 'user-beta');
    
    // Update status one last time before clearing
    if (currentUser && db) {
        const userRole = currentUser === ALPHA_ADMIN ? 'Alpha' : 'Beta';
        db.ref(`status/${userRole} Online`).set(false);
        db.ref(`status/${userRole} Last Seen`).set(firebase.database.ServerValue.TIMESTAMP);

        // Detach all listeners to prevent data leaking to next user
        const otherUser = currentUser === ALPHA_ADMIN ? BETA_ADMIN : ALPHA_ADMIN;
        db.ref('messages').off();
        db.ref('pinned_message').off();
        db.ref('status').off();
        db.ref(`typing/${otherUser}`).off();
        db.ref(`Profile Pic/${userRole}_Profile_Pic`).off();
        db.ref(`signals/${userRole}_incoming_Audio`).off();
        db.ref(`signals/${userRole}_incoming_Video`).off();
        db.ref(`signals/${userRole}_candidates`).off();
    }

    // Clear Status Logic
    // Reset Profile Image to default
    profileImageDisplay.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    
    if (statusCheckInterval) clearInterval(statusCheckInterval);
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
        menuIconBtn.classList.remove('rotate');
        logoutModal.style.display = 'flex';
        mainContent.classList.add('blur-content');
    }
});
