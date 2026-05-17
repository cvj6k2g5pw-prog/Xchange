import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://lzdzvvxgexglrbcwlffd.supabase.co";
const SUPABASE_KEY = "sb_publishable_6LjnpActNYnDgtCRUdL2sQ_tQwafnIm";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const NEON = "#FF6B00";
const DARK = "#0a0a0a";
const CARD_BG = "#111";
const SURFACE = "#181818";
const BORDER = "#222";

const T = {
  de: {
    tagline: "Finde deinen perfekten Austauschpartner",
    login: "Anmelden", register: "Registrieren", email: "E-Mail",
    password: "Passwort", name: "Dein Name", age: "Alter",
    country: "Dein Land", wantedCountry: "Wunschland (z.B. Deutschland, USA)",
    languages: "Sprachen (z.B. Deutsch, Englisch)",
    hobbies: "Hobbys (z.B. Sport, Musik)",
    bio: "Über mich", save: "Profil speichern",
    matches: "Matches", swipe: "Entdecken", chat: "Chat", profile: "Profil",
    noMore: "Keine Profile mehr! Schau später nochmal vorbei.",
    matched: "It's a Match!", matchedSub: "Ihr könnt jetzt chatten!",
    sendMsg: "Nachricht...", logout: "Abmelden",
    wants: "Möchte reisen nach", speaks: "Spricht", interests: "Interessen",
    noMatches: "Noch keine Matches. Fang an zu swipen!",
    back: "Zurück", welcomeBack: "Willkommen zurück",
    createAcc: "Account erstellen", alreadyAcc: "Schon einen Account?",
    noAcc: "Noch kein Account?", loading: "Laden...",
    saving: "Speichern...", profileSaved: "Profil gespeichert!",
    error: "Fehler", uploadPhoto: "Foto hochladen", uploading: "Wird hochgeladen...",
  },
  en: {
    tagline: "Find your perfect exchange partner",
    login: "Sign In", register: "Sign Up", email: "Email",
    password: "Password", name: "Your Name", age: "Age",
    country: "Your Country", wantedCountry: "Desired Country (e.g. Germany, USA)",
    languages: "Languages (e.g. German, English)",
    hobbies: "Hobbies (e.g. Sports, Music)",
    bio: "About Me", save: "Save Profile",
    matches: "Matches", swipe: "Discover", chat: "Chat", profile: "Profile",
    noMore: "No more profiles! Check back later.",
    matched: "It's a Match!", matchedSub: "You can now chat!",
    sendMsg: "Message...", logout: "Log Out",
    wants: "Wants to travel to", speaks: "Speaks", interests: "Interests",
    noMatches: "No matches yet. Start swiping!",
    back: "Back", welcomeBack: "Welcome back",
    createAcc: "Create Account", alreadyAcc: "Already have an account?",
    noAcc: "Don't have an account?", loading: "Loading...",
    saving: "Saving...", profileSaved: "Profile saved!",
    error: "Error", uploadPhoto: "Upload Photo", uploading: "Uploading...",
  }
};

function useSwipe(onLeft, onRight) {
  const startX = useRef(null);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const onStart = (x) => { startX.current = x; setDragging(true); };
  const onMove = (x) => { if (startX.current !== null) setDragX(x - startX.current); };
  const onEnd = () => {
    if (dragX > 80) onRight();
    else if (dragX < -80) onLeft();
    setDragX(0); setDragging(false); startX.current = null;
  };
  return {
    dragX, dragging,
    handlers: {
      onMouseDown: (e) => onStart(e.clientX),
      onMouseMove: (e) => { if (dragging) onMove(e.clientX); },
      onMouseUp: onEnd, onMouseLeave: onEnd,
      onTouchStart: (e) => onStart(e.touches[0].clientX),
      onTouchMove: (e) => onMove(e.touches[0].clientX),
      onTouchEnd: onEnd,
    }
  };
}

export default function SimpleXchange() {
  const [lang, setLang] = useState("de");
  const t = T[lang];

  const [screen, setScreen] = useState("landing");
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileForm, setProfileForm] = useState({ name: "", age: "", country: "", wanted_countries: "", languages: "", hobbies: "", bio: "" });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchPopup, setMatchPopup] = useState(null);
  const [loadingProfiles, setLoadingProfiles] = useState(false);

  const [activeTab, setActiveTab] = useState("swipe");
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [msgInput, setMsgInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) { setScreen("app"); loadProfile(session.user.id); }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
      if (session) { setScreen("app"); loadProfile(session.user.id); }
      else { setScreen("landing"); setProfile(null); setProfiles([]); setMatches([]); }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function loadProfile(userId) {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (data) {
      setProfile(data);
      setProfileForm({
        name: data.name || "",
        age: data.age || "",
        country: data.country || "",
        wanted_countries: (data.wanted_countries || []).join(", "),
        languages: (data.languages || []).join(", "),
        hobbies: (data.hobbies || []).join(", "),
        bio: data.bio || "",
      });
    }
  }

  async function loadProfiles(userId) {
    setLoadingProfiles(true);
    const { data: swipes } = await supabase.from("swipes").select("swiped_id").eq("swiper_id", userId);
    const ids = (swipes || []).map(s => s.swiped_id);
    let query = supabase.from("profiles").select("*").neq("id", userId);
    if (ids.length > 0) query = query.not("id", "in", `(${ids.join(",")})`);
    const { data } = await query.limit(30);
    setProfiles(data || []);
    setLoadingProfiles(false);
  }

  async function loadMatches(userId) {
    const { data: myLikes } = await supabase.from("swipes").select("swiped_id").eq("swiper_id", userId).eq("liked", true);
    if (!myLikes || myLikes.length === 0) { setMatches([]); return; }
    const likedIds = myLikes.map(s => s.swiped_id);
    const { data: theirLikes } = await supabase.from("swipes").select("swiper_id").eq("liked", true).in("swiper_id", likedIds).eq("swiped_id", userId);
    if (!theirLikes || theirLikes.length === 0) { setMatches([]); return; }
    const matchIds = theirLikes.map(s => s.swiper_id);
    const { data: matchProfiles } = await supabase.from("profiles").select("*").in("id", matchIds);
    setMatches(matchProfiles || []);
  }

  useEffect(() => {
    if (screen === "app" && session) {
      loadProfiles(session.user.id);
      loadMatches(session.user.id);
    }
  }, [screen, session]);

  useEffect(() => {
    if (!activeChat || !session) return;
    fetchChatMessages();
    const channel = supabase.channel(`chat_${[session.user.id, activeChat.id].sort().join("_")}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const msg = payload.new;
        if ((msg.sender_id === session.user.id && msg.receiver_id === activeChat.id) ||
            (msg.sender_id === activeChat.id && msg.receiver_id === session.user.id)) {
          setChatMessages(prev => [...prev, msg]);
        }
      }).subscribe();
    return () => supabase.removeChannel(channel);
  }, [activeChat]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  async function fetchChatMessages() {
    if (!activeChat || !session) return;
    const { data } = await supabase.from("messages").select("*")
      .or(`and(sender_id.eq.${session.user.id},receiver_id.eq.${activeChat.id}),and(sender_id.eq.${activeChat.id},receiver_id.eq.${session.user.id})`)
      .order("created_at", { ascending: true });
    setChatMessages(data || []);
  }

  async function handleAuth() {
    setAuthLoading(true); setAuthError("");
    if (authMode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email: authForm.email, password: authForm.password });
      if (error) setAuthError(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({ email: authForm.email, password: authForm.password });
      if (error) { setAuthError(error.message); }
      else if (data.user) {
        await supabase.from("profiles").insert({ id: data.user.id, name: "", age: null, country: "", wanted_countries: [], languages: [], hobbies: [], bio: "", photo_url: "" });
      }
    }
    setAuthLoading(false);
  }

  async function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file || !session) return;
    setPhotoUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${session.user.id}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (uploadError) { setPhotoUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    await supabase.from("profiles").upsert({ id: session.user.id, photo_url: publicUrl });
    setProfile(prev => ({ ...prev, photo_url: publicUrl }));
    setPhotoUploading(false);
  }

  async function saveProfile() {
    if (!session) return;
    setProfileSaving(true); setProfileMsg("");
    const updates = {
      id: session.user.id,
      name: profileForm.name,
      age: parseInt(profileForm.age) || null,
      country: profileForm.country,
      wanted_countries: profileForm.wanted_countries.split(",").map(s => s.trim()).filter(Boolean),
      languages: profileForm.languages.split(",").map(s => s.trim()).filter(Boolean),
      hobbies: profileForm.hobbies.split(",").map(s => s.trim()).filter(Boolean),
      bio: profileForm.bio,
    };
    const { error } = await supabase.from("profiles").upsert(updates);
    if (!error) { setProfile(prev => ({ ...prev, ...updates })); setProfileMsg(t.profileSaved); }
    else setProfileMsg(`${t.error}: ${error.message}`);
    setProfileSaving(false);
    setTimeout(() => setProfileMsg(""), 3000);
  }

  async function handleLike() {
    const current = profiles[0];
    if (!current || !session) return;
    setProfiles(prev => prev.slice(1));
    await supabase.from("swipes").insert({ swiper_id: session.user.id, swiped_id: current.id, liked: true });
    const { data } = await supabase.from("swipes").select("*").eq("swiper_id", current.id).eq("swiped_id", session.user.id).eq("liked", true).maybeSingle();
    if (data) {
      setMatches(prev => [...prev, current]);
      setMatchPopup(current);
      setTimeout(() => setMatchPopup(null), 4000);
    }
  }

  async function handleDislike() {
    const current = profiles[0];
    if (!current || !session) return;
    setProfiles(prev => prev.slice(1));
    await supabase.from("swipes").insert({ swiper_id: session.user.id, swiped_id: current.id, liked: false });
  }

  async function sendMessage() {
    if (!msgInput.trim() || !activeChat || !session) return;
    const text = msgInput; setMsgInput("");
    await supabase.from("messages").insert({ sender_id: session.user.id, receiver_id: activeChat.id, content: text });
  }

  const current = profiles[0];
  const { dragX, dragging, handlers } = useSwipe(() => handleDislike(), () => handleLike());
  const rot = Math.min(Math.max(dragX / 15, -15), 15);

  if (screen === "landing") return (
    <div style={{ background: DARK, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Courier New', monospace", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`, backgroundSize: "40px 40px", opacity: 0.4 }} />
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${NEON}22 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 24, right: 24, display: "flex", gap: 8 }}>
        {["de","en"].map(l => <LangBtn key={l} l={l} lang={lang} setLang={setLang} />)}
      </div>
      <div style={{ position: "relative", textAlign: "center", padding: "0 24px" }}>
        <Logo />
        <div style={{ color: "#666", fontSize: 14, letterSpacing: 3, textTransform: "uppercase", marginBottom: 48 }}>{t.tagline}</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => { setAuthMode("register"); setScreen("auth"); }} style={{ background: NEON, color: DARK, border: "none", borderRadius: 8, padding: "14px 32px", fontWeight: 900, fontSize: 15, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 0 20px ${NEON}66` }}>
            {t.register} →
          </button>
          <button onClick={() => { setAuthMode("login"); setScreen("auth"); }} style={{ background: "transparent", color: NEON, border: `1px solid ${NEON}`, borderRadius: 8, padding: "14px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
            {t.login}
          </button>
        </div>
      </div>
    </div>
  );

  if (screen === "auth") return (
    <div style={{ background: DARK, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Courier New', monospace", padding: 24 }}>
      <div style={{ position: "absolute", top: 24, right: 24, display: "flex", gap: 8 }}>
        {["de","en"].map(l => <LangBtn key={l} l={l} lang={lang} setLang={setLang} />)}
      </div>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ marginBottom: 28 }}><Logo small /></div>
        <div style={{ color: "#555", fontSize: 13, marginBottom: 20 }}>{authMode === "login" ? t.welcomeBack : t.createAcc}</div>
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <input placeholder={t.email} type="email" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} style={inputStyle} />
          <input placeholder={t.password} type="password" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} onKeyDown={e => e.key === "Enter" && handleAuth()} style={inputStyle} />
          {authError && <div style={{ color: "#ff4444", fontSize: 12 }}>{authError}</div>}
          <button onClick={handleAuth} disabled={authLoading} style={{ background: NEON, color: DARK, border: "none", borderRadius: 8, padding: "14px", fontWeight: 900, fontSize: 15, cursor: "pointer", fontFamily: "inherit", opacity: authLoading ? 0.7 : 1, boxShadow: `0 0 16px ${NEON}44` }}>
            {authLoading ? t.loading : `${authMode === "login" ? t.login : t.register} →`}
          </button>
          <div style={{ color: "#555", fontSize: 12, textAlign: "center" }}>
            {authMode === "login" ? t.noAcc : t.alreadyAcc}{" "}
            <span onClick={() => { setAuthMode(authMode === "login" ? "register" : "login"); setAuthError(""); }} style={{ color: NEON, cursor: "pointer" }}>
              {authMode === "login" ? t.register : t.login}
            </span>
          </div>
        </div>
        <div onClick={() => setScreen("landing")} style={{ color: "#444", fontSize: 12, textAlign: "center", marginTop: 16, cursor: "pointer" }}>← {t.back}</div>
      </div>
    </div>
  );

  return (
    <div style={{ background: DARK, minHeight: "100vh", maxWidth: 480, margin: "0 auto", fontFamily: "'Courier New', monospace", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <Logo small />
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["de","en"].map(l => <LangBtn key={l} l={l} lang={lang} setLang={setLang} />)}
          <button onClick={() => supabase.auth.signOut()} style={{ background: "transparent", color: "#555", border: "none", cursor: "pointer", fontSize: 11, fontFamily: "inherit", marginLeft: 4 }}>{t.logout}</button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "hidden" }}>

        {activeTab === "swipe" && (
          <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", height: "calc(100vh - 120px)", justifyContent: "center" }}>
            {loadingProfiles ? (
              <div style={{ color: "#555" }}>{t.loading}</div>
            ) : current ? (
              <>
                <div style={{ position: "relative", width: "100%", maxWidth: 360, userSelect: "none" }}>
                  {dragX > 20 && <div style={{ position: "absolute", top: 24, left: 24, zIndex: 10, border: `3px solid ${NEON}`, borderRadius: 8, padding: "6px 16px", color: NEON, fontWeight: 900, fontSize: 20, transform: "rotate(-12deg)", opacity: Math.min(dragX/80,1) }}>LIKE ✓</div>}
                  {dragX < -20 && <div style={{ position: "absolute", top: 24, right: 24, zIndex: 10, border: "3px solid #ff4444", borderRadius: 8, padding: "6px 16px", color: "#ff4444", fontWeight: 900, fontSize: 20, transform: "rotate(12deg)", opacity: Math.min(-dragX/80,1) }}>NOPE ✗</div>}
                  <div {...handlers} style={{ background: CARD_BG, borderRadius: 20, overflow: "hidden", border: `1px solid ${BORDER}`, transform: `translateX(${dragX}px) rotate(${rot}deg)`, transition: dragging ? "none" : "transform 0.3s ease", cursor: "grab", boxShadow: dragX > 20 ? `0 0 30px ${NEON}44` : dragX < -20 ? "0 0 30px #ff444444" : "0 8px 40px #00000088" }}>
                    <div style={{ position: "relative", height: 320 }}>
                      {current.photo_url
                        ? <img src={current.photo_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} draggable={false} />
                        : <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${NEON}22, #000)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, color: NEON }}>{current.name?.[0] || "?"}</div>
                      }
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, #000000ee)", padding: "36px 20px 18px" }}>
                        <div style={{ color: "#fff", fontWeight: 900, fontSize: 22 }}>{current.name || "?"}{current.age ? `, ${current.age}` : ""}</div>
                        <div style={{ color: NEON, fontSize: 13 }}>{current.country}</div>
                      </div>
                    </div>
                    <div style={{ padding: "14px 18px 18px" }}>
                      {current.bio && <div style={{ color: "#aaa", fontSize: 13, marginBottom: 12, lineHeight: 1.5 }}>{current.bio}</div>}
                      {(current.wanted_countries||[]).length > 0 && <TagRow label={t.wants} tags={current.wanted_countries} color={NEON} />}
                      {(current.languages||[]).length > 0 && <TagRow label={t.speaks} tags={current.languages} color="#666" />}
                      {(current.hobbies||[]).length > 0 && <TagRow label={t.interests} tags={current.hobbies} color="#444" />}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
                  <button onClick={handleDislike} style={{ width: 58, height: 58, borderRadius: "50%", background: SURFACE, border: "1px solid #333", color: "#ff4444", fontSize: 22, cursor: "pointer" }}>✕</button>
                  <button onClick={handleLike} style={{ width: 58, height: 58, borderRadius: "50%", background: SURFACE, border: `1px solid ${NEON}44`, color: NEON, fontSize: 22, cursor: "pointer", boxShadow: `0 0 16px ${NEON}33` }}>♥</button>
                </div>
              </>
            ) : (
              <div style={{ color: "#555", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🌍</div>
                <div style={{ fontSize: 14 }}>{t.noMore}</div>
              </div>
            )}
          </div>
        )}

        {activeTab === "matches" && (
          <div style={{ padding: 16, overflowY: "auto", maxHeight: "calc(100vh - 120px)" }}>
            {matches.length === 0
              ? <EmptyState icon="🧡" text={t.noMatches} />
              : matches.map(m => <MatchRow key={m.id} m={m} onClick={() => { setActiveChat(m); setActiveTab("chat"); }} />)
            }
          </div>
        )}

        {activeTab === "chat" && (
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
            {activeChat ? (
              <>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <button onClick={() => { setActiveChat(null); setChatMessages([]); }} style={{ background: "none", border: "none", color: NEON, cursor: "pointer", fontSize: 18 }}>←</button>
                  <Avatar p={activeChat} size={36} />
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{activeChat.name}</div>
                    <div style={{ color: NEON, fontSize: 11 }}>{activeChat.country}</div>
                  </div>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  {chatMessages.length === 0 && <div style={{ color: "#444", fontSize: 13, textAlign: "center", marginTop: 40 }}>🌍 Match! Schreib die erste Nachricht.</div>}
                  {chatMessages.map((msg, i) => {
                    const isMe = msg.sender_id === session?.user?.id;
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                        <div style={{ maxWidth: "72%", background: isMe ? NEON : SURFACE, color: isMe ? DARK : "#fff", padding: "10px 14px", borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px", fontSize: 14, border: isMe ? "none" : `1px solid ${BORDER}` }}>
                          {msg.content}
                          <div style={{ fontSize: 10, color: isMe ? "#00000066" : "#555", marginTop: 3, textAlign: "right" }}>{new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>
                <div style={{ padding: "12px 16px", borderTop: `1px solid ${BORDER}`, display: "flex", gap: 10, flexShrink: 0 }}>
                  <input value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder={t.sendMsg} style={{ ...inputStyle, flex: 1 }} />
                  <button onClick={sendMessage} style={{ background: NEON, color: DARK, border: "none", borderRadius: 8, padding: "0 18px", fontWeight: 900, cursor: "pointer", fontFamily: "inherit" }}>→</button>
                </div>
              </>
            ) : (
              <div style={{ padding: 16 }}>
                {matches.length === 0
                  ? <EmptyState icon="💬" text={t.noMatches} />
                  : matches.map(m => <MatchRow key={m.id} m={m} onClick={() => setActiveChat(m)} />)
                }
              </div>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div style={{ padding: 20, overflowY: "auto", maxHeight: "calc(100vh - 120px)" }}>
            {/* Photo Upload */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto 12px" }}>
                <Avatar p={profile || {}} size={90} large />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: NEON, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, boxShadow: `0 0 10px ${NEON}66` }}
                >
                  📷
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
              </div>
              {photoUploading && <div style={{ color: NEON, fontSize: 12 }}>{t.uploading}</div>}
              <div style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>{profile?.name || "—"}</div>
              <div style={{ color: NEON, fontSize: 13 }}>{profile?.country || ""}</div>
              <div onClick={() => fileInputRef.current?.click()} style={{ color: "#555", fontSize: 12, marginTop: 4, cursor: "pointer", textDecoration: "underline" }}>{t.uploadPhoto}</div>
            </div>

            {[
              { key: "name", label: t.name }, { key: "age", label: t.age, type: "number" },
              { key: "country", label: t.country }, { key: "wanted_countries", label: t.wantedCountry },
              { key: "languages", label: t.languages }, { key: "hobbies", label: t.hobbies },
            ].map(({ key, label, type }) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{label}</div>
                <input type={type || "text"} value={profileForm[key]} onChange={e => setProfileForm({...profileForm, [key]: e.target.value})} placeholder={label} style={inputStyle} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{t.bio}</div>
              <textarea value={profileForm.bio} onChange={e => setProfileForm({...profileForm, bio: e.target.value})} placeholder={t.bio} style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} />
            </div>
            {profileMsg && <div style={{ color: profileMsg.includes(t.error) ? "#ff4444" : NEON, fontSize: 12, marginBottom: 10, textAlign: "center" }}>{profileMsg}</div>}
            <button onClick={saveProfile} disabled={profileSaving} style={{ background: NEON, color: DARK, border: "none", borderRadius: 8, padding: "14px", width: "100%", fontWeight: 900, cursor: "pointer", fontFamily: "inherit", fontSize: 14, opacity: profileSaving ? 0.7 : 1, boxShadow: `0 0 16px ${NEON}44` }}>
              {profileSaving ? t.saving : t.save}
            </button>
          </div>
        )}
      </div>

      {matchPopup && (
        <div style={{ position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: CARD_BG, border: `1px solid ${NEON}`, borderRadius: 20, padding: 32, textAlign: "center", maxWidth: 300, boxShadow: `0 0 60px ${NEON}44` }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🧡</div>
            <div style={{ color: NEON, fontWeight: 900, fontSize: 24, marginBottom: 8 }}>{t.matched}</div>
            <div style={{ color: "#aaa", fontSize: 14, marginBottom: 16 }}>{t.matchedSub}</div>
            <div style={{ marginBottom: 12 }}><Avatar p={matchPopup} size={72} large /></div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 16 }}>{matchPopup.name}</div>
            <button onClick={() => { setMatchPopup(null); setActiveChat(matchPopup); setActiveTab("chat"); }}
              style={{ background: NEON, color: DARK, border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 900, cursor: "pointer", fontFamily: "inherit", width: "100%", boxShadow: `0 0 16px ${NEON}44` }}>
              {t.chat} →
            </button>
          </div>
        </div>
      )}

      <div style={{ borderTop: `1px solid ${BORDER}`, display: "flex", background: DARK, flexShrink: 0 }}>
        {[
          { id: "swipe", icon: "🔥", label: t.swipe },
          { id: "matches", icon: "🧡", label: t.matches },
          { id: "chat", icon: "💬", label: t.chat },
          { id: "profile", icon: "👤", label: t.profile },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ flex: 1, padding: "12px 0", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, borderTop: activeTab === tab.id ? `2px solid ${NEON}` : "2px solid transparent", color: activeTab === tab.id ? NEON : "#444" }}>
            <span style={{ fontSize: 18 }}>{tab.icon}</span>
            <span style={{ fontSize: 9, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1, fontWeight: activeTab === tab.id ? 700 : 400 }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Logo({ small }) {
  return <div style={{ fontSize: small ? 20 : 58, fontWeight: 900, letterSpacing: small ? -0.5 : -2, color: "#fff", lineHeight: 1 }}>Simple<span style={{ color: NEON, textShadow: `0 0 ${small ? 8 : 20}px ${NEON}88` }}>X</span>change</div>;
}

function LangBtn({ l, lang, setLang }) {
  return <button onClick={() => setLang(l)} style={{ background: lang === l ? NEON : "transparent", color: lang === l ? DARK : NEON, border: `1px solid ${NEON}`, borderRadius: 4, padding: "3px 9px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 10 }}>{l.toUpperCase()}</button>;
}

function Avatar({ p, size, large }) {
  const style = { width: size, height: size, borderRadius: "50%", border: `2px solid ${NEON}`, objectFit: "cover" };
  const fallback = { ...style, background: `${NEON}22`, display: "flex", alignItems: "center", justifyContent: "center", color: NEON, fontWeight: 900, fontSize: large ? 28 : Math.round(size * 0.4), margin: large ? "0 auto" : undefined };
  return p?.photo_url ? <img src={p.photo_url} style={style} alt="" /> : <div style={fallback}>{p?.name?.[0] || "?"}</div>;
}

function TagRow({ label, tags, color }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {tags.map(tag => <span key={tag} style={{ background: `${color}18`, color: color === NEON ? NEON : "#888", border: `1px solid ${color}33`, borderRadius: 6, padding: "3px 9px", fontSize: 11, fontFamily: "'Courier New', monospace" }}>{tag}</span>)}
      </div>
    </div>
  );
}

function MatchRow({ m, onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, marginBottom: 10, cursor: "pointer" }}>
      <div style={{ position: "relative" }}>
        <Avatar p={m} size={52} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", background: NEON, border: `2px solid ${SURFACE}` }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#fff", fontWeight: 700 }}>{m.name}</div>
        <div style={{ color: "#555", fontSize: 12 }}>{m.country}</div>
      </div>
      <div style={{ color: NEON }}>→</div>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return <div style={{ color: "#555", textAlign: "center", padding: 48 }}><div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div><div style={{ fontSize: 14 }}>{text}</div></div>;
}

const inputStyle = { background: DARK, color: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "11px 13px", fontSize: 14, fontFamily: "'Courier New', monospace", outline: "none", width: "100%", boxSizing: "border-box" };
