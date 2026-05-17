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
const BLUE = "#1DA1F2";

const COUNTRIES_DE = ["Afghanistan","Ägypten","Albanien","Algerien","Andorra","Angola","Argentinien","Armenien","Aserbaidschan","Äthiopien","Australien","Österreich","Bahrain","Bangladesch","Belarus","Belgien","Bolivien","Bosnien und Herzegowina","Brasilien","Bulgarien","Chile","China","Costa Rica","Dänemark","Deutschland","Ecuador","El Salvador","Estland","Finnland","Frankreich","Georgien","Ghana","Griechenland","Guatemala","Honduras","Hongkong","Indien","Indonesien","Irak","Iran","Irland","Island","Israel","Italien","Japan","Jordanien","Kambodscha","Kamerun","Kanada","Kasachstan","Kenia","Kolumbien","Kroatien","Kuba","Kuwait","Lettland","Libanon","Libyen","Liechtenstein","Litauen","Luxemburg","Malaysia","Malta","Marokko","Mexiko","Moldawien","Monaco","Montenegro","Myanmar","Namibia","Nepal","Neuseeland","Nicaragua","Niederlande","Nigeria","Nordkorea","Nordmazedonien","Norwegen","Pakistan","Panama","Paraguay","Peru","Philippinen","Polen","Portugal","Rumänien","Russland","Saudi-Arabien","Schweden","Schweiz","Senegal","Serbien","Singapur","Slowakei","Slowenien","Somalia","Spanien","Sri Lanka","Südafrika","Südkorea","Syrien","Taiwan","Tanzania","Thailand","Tschechien","Tunesien","Türkei","Ukraine","Ungarn","Uruguay","USA","Usbekistan","Venezuela","Vietnam","Weißrussland","Zypern"];

const COUNTRIES_EN = ["Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Bolivia","Bosnia and Herzegovina","Brazil","Bulgaria","Cambodia","Cameroon","Canada","Chile","China","Colombia","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Ecuador","Egypt","El Salvador","Estonia","Ethiopia","Finland","France","Georgia","Germany","Ghana","Greece","Guatemala","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Latvia","Lebanon","Libya","Liechtenstein","Lithuania","Luxembourg","Malaysia","Malta","Mexico","Moldova","Monaco","Montenegro","Morocco","Myanmar","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Nigeria","North Korea","North Macedonia","Norway","Pakistan","Panama","Paraguay","Peru","Philippines","Poland","Portugal","Romania","Russia","Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia","Somalia","South Africa","South Korea","Spain","Sri Lanka","Sweden","Switzerland","Syria","Taiwan","Tanzania","Thailand","Tunisia","Turkey","Ukraine","United Kingdom","Uruguay","USA","Uzbekistan","Venezuela","Vietnam"];

const T = {
  de: {
    tagline: "Finde deinen perfekten Austauschpartner",
    login: "Anmelden", register: "Registrieren", email: "E-Mail",
    password: "Passwort", name: "Dein Name", age: "Alter",
    country: "Dein Land", wantedCountry: "Wunschland",
    languages: "Sprachen (z.B. Deutsch, Englisch)",
    hobbies: "Hobbys (z.B. Sport, Musik)",
    bio: "Über mich", save: "Profil speichern",
    matches: "Matches", swipe: "Entdecken", chat: "Chat", profile: "Profil",
    noMore: "Keine Profile mehr! Schau später nochmal vorbei.",
    matched: "It's a Match!", matchedSub: "Ihr könnt jetzt chatten!",
    sendMsg: "Nachricht...", logout: "Abmelden",
    wants: "Möchte reisen nach", speaks: "Spricht", interests: "Interessen",
    noMatches: "Noch keine Matches!", noMatchesSub: "Fang an zu swipen und finde deinen Austauschpartner 🌍",
    back: "Zurück", welcomeBack: "Willkommen zurück",
    createAcc: "Account erstellen", alreadyAcc: "Schon einen Account?",
    noAcc: "Noch kein Account?", loading: "Laden...",
    saving: "Speichern...", profileSaved: "Profil gespeichert!",
    error: "Fehler", uploadPhoto: "Foto hochladen", uploading: "Wird hochgeladen...",
    next: "Weiter →", skip: "Überspringen", finish: "Fertig & Loslegen →",
    filterTitle: "Filter", filterCountry: "Nach Land filtern",
    filterAge: "Alter", filterLang: "Sprache", applyFilter: "Anwenden",
    resetFilter: "Zurücksetzen", allCountries: "Alle Länder",
    allLangs: "Alle Sprachen", from: "von", to: "bis",
    photo1: "Hauptfoto", photo2: "2. Foto (optional)",
    verified: "Verifiziert", verifiedMsg: "✓ Verifizierter Nutzer – Identität wurde bestätigt",
    ageError: "Du bist leider nicht im richtigen Alter (13–25 Jahre).",
    searchCountry: "Land suchen...", newMatches: "Neue Matches", recentChats: "Chats",
  },
  en: {
    tagline: "Find your perfect exchange partner",
    login: "Sign In", register: "Sign Up", email: "Email",
    password: "Password", name: "Your Name", age: "Age",
    country: "Your Country", wantedCountry: "Desired Country",
    languages: "Languages (e.g. German, English)",
    hobbies: "Hobbies (e.g. Sports, Music)",
    bio: "About Me", save: "Save Profile",
    matches: "Matches", swipe: "Discover", chat: "Chat", profile: "Profile",
    noMore: "No more profiles! Check back later.",
    matched: "It's a Match!", matchedSub: "You can now chat!",
    sendMsg: "Message...", logout: "Log Out",
    wants: "Wants to travel to", speaks: "Speaks", interests: "Interests",
    noMatches: "No matches yet!", noMatchesSub: "Start swiping to find your exchange partner 🌍",
    back: "Back", welcomeBack: "Welcome back",
    createAcc: "Create Account", alreadyAcc: "Already have an account?",
    noAcc: "Don't have an account?", loading: "Loading...",
    saving: "Saving...", profileSaved: "Profile saved!",
    error: "Error", uploadPhoto: "Upload Photo", uploading: "Uploading...",
    next: "Next →", skip: "Skip", finish: "Done & Start →",
    filterTitle: "Filter", filterCountry: "Filter by Country",
    filterAge: "Age", filterLang: "Language", applyFilter: "Apply",
    resetFilter: "Reset", allCountries: "All Countries",
    allLangs: "All Languages", from: "from", to: "to",
    photo1: "Main Photo", photo2: "2nd Photo (optional)",
    verified: "Verified", verifiedMsg: "✓ Verified User – Identity has been confirmed",
    ageError: "Sorry, you must be between 13 and 25 years old.",
    searchCountry: "Search country...", newMatches: "New Matches", recentChats: "Chats",
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

// Country Search Component
function CountrySelect({ value, onChange, placeholder, lang }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const countries = lang === "de" ? COUNTRIES_DE : COUNTRIES_EN;
  const filtered = query.length > 0 ? countries.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 6) : [];

  useEffect(() => { setQuery(value || ""); }, [value]);

  return (
    <div style={{ position: "relative" }}>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => { setFocused(true); setOpen(true); }}
        onBlur={() => setTimeout(() => { setOpen(false); setFocused(false); }, 150)}
        placeholder={placeholder}
        style={inputStyle}
      />
      {open && filtered.length > 0 && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#1a1a1a", border: `1px solid ${BORDER}`, borderRadius: 8, zIndex: 50, overflow: "hidden", marginTop: 4 }}>
          {filtered.map(c => (
            <div key={c} onMouseDown={() => { onChange(c); setQuery(c); setOpen(false); }}
              style={{ padding: "10px 14px", color: "#fff", fontSize: 14, cursor: "pointer", borderBottom: `1px solid ${BORDER}`, fontFamily: "'Courier New', monospace" }}
              onMouseEnter={e => e.target.style.background = `${NEON}22`}
              onMouseLeave={e => e.target.style.background = "transparent"}>
              {c}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Multi Country Select
function MultiCountrySelect({ value, onChange, placeholder, lang }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const countries = lang === "de" ? COUNTRIES_DE : COUNTRIES_EN;
  const selected = value ? value.split(",").map(s => s.trim()).filter(Boolean) : [];
  const filtered = query.length > 0 ? countries.filter(c => c.toLowerCase().includes(query.toLowerCase()) && !selected.includes(c)).slice(0, 5) : [];

  function addCountry(c) {
    const newSelected = [...selected, c];
    onChange(newSelected.join(", "));
    setQuery(""); setOpen(false);
  }
  function removeCountry(c) {
    onChange(selected.filter(s => s !== c).join(", "));
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: selected.length > 0 ? 8 : 0 }}>
        {selected.map(c => (
          <span key={c} style={{ background: `${NEON}22`, color: NEON, border: `1px solid ${NEON}44`, borderRadius: 6, padding: "4px 10px", fontSize: 12, display: "flex", alignItems: "center", gap: 6, fontFamily: "'Courier New', monospace" }}>
            {c}
            <span onClick={() => removeCountry(c)} style={{ cursor: "pointer", color: "#ff4444", fontWeight: 900 }}>×</span>
          </span>
        ))}
      </div>
      <div style={{ position: "relative" }}>
        <input value={query} onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder} style={inputStyle} />
        {open && filtered.length > 0 && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#1a1a1a", border: `1px solid ${BORDER}`, borderRadius: 8, zIndex: 50, overflow: "hidden", marginTop: 4 }}>
            {filtered.map(c => (
              <div key={c} onMouseDown={() => addCountry(c)}
                style={{ padding: "10px 14px", color: "#fff", fontSize: 14, cursor: "pointer", borderBottom: `1px solid ${BORDER}`, fontFamily: "'Courier New', monospace" }}
                onMouseEnter={e => e.target.style.background = `${NEON}22`}
                onMouseLeave={e => e.target.style.background = "transparent"}>
                {c}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
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
  const [ageError, setAgeError] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photo2Uploading, setPhoto2Uploading] = useState(false);
  const fileInputRef = useRef(null);
  const fileInput2Ref = useRef(null);

  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingForm, setOnboardingForm] = useState({ name: "", age: "", country: "", wanted_countries: "", languages: "", hobbies: "", bio: "" });
  const [onboardingSaving, setOnboardingSaving] = useState(false);
  const [onboardingAgeError, setOnboardingAgeError] = useState("");

  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ country: "", ageMin: "", ageMax: "", language: "" });
  const [activeFilter, setActiveFilter] = useState({ country: "", ageMin: "", ageMax: "", language: "" });

  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchPopup, setMatchPopup] = useState(null);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [verifiedPopup, setVerifiedPopup] = useState(false);

  const [activeTab, setActiveTab] = useState("swipe");
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [msgInput, setMsgInput] = useState("");
  const chatEndRef = useRef(null);
  const [cardPhotoIndex, setCardPhotoIndex] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkProfileAndRoute(session.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
      if (session) checkProfileAndRoute(session.user.id);
      else { setScreen("landing"); setProfile(null); setProfiles([]); setMatches([]); }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function checkProfileAndRoute(userId) {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (data) {
      setProfile(data);
      setProfileForm({
        name: data.name || "", age: data.age || "", country: data.country || "",
        wanted_countries: (data.wanted_countries || []).join(", "),
        languages: (data.languages || []).join(", "),
        hobbies: (data.hobbies || []).join(", "),
        bio: data.bio || "",
      });
      if (!data.name || !data.country) {
        setOnboardingForm({
          name: data.name || "", age: data.age || "", country: data.country || "",
          wanted_countries: (data.wanted_countries || []).join(", "),
          languages: (data.languages || []).join(", "),
          hobbies: (data.hobbies || []).join(", "),
          bio: data.bio || "",
        });
        setScreen("onboarding");
      } else setScreen("app");
    }
  }

  async function loadProfiles(userId, appliedFilter) {
    setLoadingProfiles(true);
    const { data: swipes } = await supabase.from("swipes").select("swiped_id").eq("swiper_id", userId);
    const ids = (swipes || []).map(s => s.swiped_id);
    let query = supabase.from("profiles").select("*").neq("id", userId);
    if (ids.length > 0) query = query.not("id", "in", `(${ids.join(",")})`);
    const f = appliedFilter || activeFilter;
    if (f.country) query = query.ilike("country", `%${f.country}%`);
    if (f.ageMin) query = query.gte("age", parseInt(f.ageMin));
    if (f.ageMax) query = query.lte("age", parseInt(f.ageMax));
    const { data } = await query.limit(50);
    let result = data || [];
    if (f.language) result = result.filter(p => (p.languages || []).some(l => l.toLowerCase().includes(f.language.toLowerCase())));
    setProfiles(result);
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
    if (screen === "app" && session) { loadProfiles(session.user.id); loadMatches(session.user.id); }
  }, [screen, session]);

  useEffect(() => {
    if (!activeChat || !session) return;
    fetchChatMessages();
    markMessagesAsSeen();
    const channel = supabase.channel(`chat_${[session.user.id, activeChat.id].sort().join("_")}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const msg = payload.new;
        if ((msg.sender_id === session.user.id && msg.receiver_id === activeChat.id) ||
            (msg.sender_id === activeChat.id && msg.receiver_id === session.user.id)) {
          setChatMessages(prev => [...prev, msg]);
          if (msg.sender_id === activeChat.id) supabase.from("messages").update({ seen: true }).eq("id", msg.id);
        }
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "messages" }, (payload) => {
        setChatMessages(prev => prev.map(m => m.id === payload.new.id ? payload.new : m));
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

  async function markMessagesAsSeen() {
    if (!activeChat || !session) return;
    await supabase.from("messages").update({ seen: true }).eq("sender_id", activeChat.id).eq("receiver_id", session.user.id).eq("seen", false);
  }

  async function handleAuth() {
    setAuthLoading(true); setAuthError("");
    if (authMode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email: authForm.email, password: authForm.password });
      if (error) setAuthError(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({ email: authForm.email, password: authForm.password });
      if (error) setAuthError(error.message);
      else if (data.user) {
        await supabase.from("profiles").insert({ id: data.user.id, name: "", age: null, country: "", wanted_countries: [], languages: [], hobbies: [], bio: "", photo_url: "", photo_url_2: "", verified: false });
        setScreen("onboarding");
      }
    }
    setAuthLoading(false);
  }

  function validateAge(age) {
    const n = parseInt(age);
    if (!age) return true;
    return n >= 13 && n <= 25;
  }

  async function saveOnboarding() {
    if (!validateAge(onboardingForm.age)) { setOnboardingAgeError(t.ageError); return; }
    setOnboardingAgeError("");
    if (!session) return;
    setOnboardingSaving(true);
    const updates = {
      id: session.user.id, name: onboardingForm.name, age: parseInt(onboardingForm.age) || null,
      country: onboardingForm.country,
      wanted_countries: onboardingForm.wanted_countries.split(",").map(s => s.trim()).filter(Boolean),
      languages: onboardingForm.languages.split(",").map(s => s.trim()).filter(Boolean),
      hobbies: onboardingForm.hobbies.split(",").map(s => s.trim()).filter(Boolean),
      bio: onboardingForm.bio,
    };
    await supabase.from("profiles").upsert(updates);
    setProfile(prev => ({ ...prev, ...updates }));
    setProfileForm({ ...onboardingForm });
    setOnboardingSaving(false);
    setScreen("app");
  }

  async function handlePhotoUpload(e, slot) {
    const file = e.target.files[0];
    if (!file || !session) return;
    slot === 1 ? setPhotoUploading(true) : setPhoto2Uploading(true);
    const ext = file.name.split(".").pop();
    const path = `${session.user.id}/avatar${slot}.${ext}`;
    await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    const field = slot === 1 ? "photo_url" : "photo_url_2";
    await supabase.from("profiles").upsert({ id: session.user.id, [field]: publicUrl });
    setProfile(prev => ({ ...prev, [field]: publicUrl }));
    slot === 1 ? setPhotoUploading(false) : setPhoto2Uploading(false);
  }

  async function saveProfile() {
    if (!validateAge(profileForm.age)) { setAgeError(t.ageError); return; }
    setAgeError("");
    if (!session) return;
    setProfileSaving(true); setProfileMsg("");
    const updates = {
      id: session.user.id, name: profileForm.name, age: parseInt(profileForm.age) || null,
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
    setProfiles(prev => prev.slice(1)); setCardPhotoIndex(0);
    await supabase.from("swipes").insert({ swiper_id: session.user.id, swiped_id: current.id, liked: true });
    const { data } = await supabase.from("swipes").select("*").eq("swiper_id", current.id).eq("swiped_id", session.user.id).eq("liked", true).maybeSingle();
    if (data) { setMatches(prev => [...prev, current]); setMatchPopup(current); setTimeout(() => setMatchPopup(null), 4000); }
  }

  async function handleDislike() {
    const current = profiles[0];
    if (!current || !session) return;
    setProfiles(prev => prev.slice(1)); setCardPhotoIndex(0);
    await supabase.from("swipes").insert({ swiper_id: session.user.id, swiped_id: current.id, liked: false });
  }

  async function sendMessage() {
    if (!msgInput.trim() || !activeChat || !session) return;
    const text = msgInput; setMsgInput("");
    await supabase.from("messages").insert({ sender_id: session.user.id, receiver_id: activeChat.id, content: text, seen: false });
  }

  function applyFilter() {
    setActiveFilter({ ...filter }); setShowFilter(false);
    if (session) loadProfiles(session.user.id, filter);
  }
  function resetFilter() {
    const empty = { country: "", ageMin: "", ageMax: "", language: "" };
    setFilter(empty); setActiveFilter(empty); setShowFilter(false);
    if (session) loadProfiles(session.user.id, empty);
  }

  const hasActiveFilter = activeFilter.country || activeFilter.ageMin || activeFilter.ageMax || activeFilter.language;
  const current = profiles[0];
  const { dragX, dragging, handlers } = useSwipe(() => handleDislike(), () => handleLike());
  const rot = Math.min(Math.max(dragX / 15, -15), 15);

  // LANDING
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
          <button onClick={() => { setAuthMode("register"); setScreen("auth"); }} style={{ background: NEON, color: DARK, border: "none", borderRadius: 8, padding: "14px 32px", fontWeight: 900, fontSize: 15, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 0 20px ${NEON}66` }}>{t.register} →</button>
          <button onClick={() => { setAuthMode("login"); setScreen("auth"); }} style={{ background: "transparent", color: NEON, border: `1px solid ${NEON}`, borderRadius: 8, padding: "14px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>{t.login}</button>
        </div>
      </div>
    </div>
  );

  // AUTH
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
            <span onClick={() => { setAuthMode(authMode === "login" ? "register" : "login"); setAuthError(""); }} style={{ color: NEON, cursor: "pointer" }}>{authMode === "login" ? t.register : t.login}</span>
          </div>
        </div>
        <div onClick={() => setScreen("landing")} style={{ color: "#444", fontSize: 12, textAlign: "center", marginTop: 16, cursor: "pointer" }}>← {t.back}</div>
      </div>
    </div>
  );

  // ONBOARDING
  if (screen === "onboarding") {
    const steps = [
      { title: "👋 " + (lang === "de" ? "Wie heißt du?" : "What's your name?"), fields: ["name", "age"] },
      { title: "🌍 " + (lang === "de" ? "Wo kommst du her?" : "Where are you from?"), fields: ["country", "wanted_countries"] },
      { title: "🗣️ " + (lang === "de" ? "Sprachen & Hobbys" : "Languages & Hobbies"), fields: ["languages", "hobbies"] },
      { title: "✍️ " + (lang === "de" ? "Über dich" : "About you"), fields: ["bio"] },
    ];
    const step = steps[onboardingStep];
    const isLast = onboardingStep === steps.length - 1;
    return (
      <div style={{ background: DARK, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Courier New', monospace", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ marginBottom: 24 }}><Logo small /></div>
          <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
            {steps.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= onboardingStep ? NEON : BORDER }} />)}
          </div>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, marginBottom: 24 }}>{step.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {step.fields.map(field => (
              <div key={field}>
                <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{t[field] || field}</div>
                {field === "bio" ? (
                  <textarea value={onboardingForm[field]} onChange={e => setOnboardingForm({...onboardingForm, [field]: e.target.value})} placeholder={t[field]} style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} />
                ) : field === "country" ? (
                  <CountrySelect value={onboardingForm.country} onChange={v => setOnboardingForm({...onboardingForm, country: v})} placeholder={t.searchCountry} lang={lang} />
                ) : field === "wanted_countries" ? (
                  <MultiCountrySelect value={onboardingForm.wanted_countries} onChange={v => setOnboardingForm({...onboardingForm, wanted_countries: v})} placeholder={t.searchCountry} lang={lang} />
                ) : field === "age" ? (
                  <>
                    <input type="number" value={onboardingForm.age} onChange={e => { setOnboardingForm({...onboardingForm, age: e.target.value}); setOnboardingAgeError(""); }} placeholder="z.B. 16" style={inputStyle} />
                    {onboardingAgeError && <div style={{ color: "#ff4444", fontSize: 12, marginTop: 4 }}>{onboardingAgeError}</div>}
                  </>
                ) : (
                  <input type="text" value={onboardingForm[field]} onChange={e => setOnboardingForm({...onboardingForm, [field]: e.target.value})} placeholder={t[field]} style={inputStyle} />
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {onboardingStep > 0 && <button onClick={() => setOnboardingStep(s => s - 1)} style={{ background: "transparent", color: "#555", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "14px 20px", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>←</button>}
            <button onClick={() => isLast ? saveOnboarding() : setOnboardingStep(s => s + 1)} disabled={onboardingSaving}
              style={{ flex: 1, background: NEON, color: DARK, border: "none", borderRadius: 8, padding: "14px", fontWeight: 900, fontSize: 15, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 0 16px ${NEON}44`, opacity: onboardingSaving ? 0.7 : 1 }}>
              {onboardingSaving ? t.saving : isLast ? t.finish : t.next}
            </button>
          </div>
          {!isLast && <div onClick={saveOnboarding} style={{ color: "#444", fontSize: 12, textAlign: "center", marginTop: 12, cursor: "pointer" }}>{t.skip}</div>}
        </div>
      </div>
    );
  }

  // MAIN APP
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

        {/* SWIPE */}
        {activeTab === "swipe" && (
          <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", alignItems: "center", height: "calc(100vh - 120px)" }}>
            <div style={{ width: "100%", maxWidth: 360, display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
              <button onClick={() => setShowFilter(true)} style={{ background: hasActiveFilter ? NEON : SURFACE, color: hasActiveFilter ? DARK : "#666", border: `1px solid ${hasActiveFilter ? NEON : BORDER}`, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>
                ⚙️ {t.filterTitle}{hasActiveFilter ? " ●" : ""}
              </button>
            </div>
            {loadingProfiles ? (
              <div style={{ color: "#555", marginTop: 40 }}>{t.loading}</div>
            ) : current ? (
              <>
                <div style={{ position: "relative", width: "100%", maxWidth: 360, userSelect: "none" }}>
                  {dragX > 20 && <div style={{ position: "absolute", top: 24, left: 24, zIndex: 10, border: `3px solid ${NEON}`, borderRadius: 8, padding: "6px 16px", color: NEON, fontWeight: 900, fontSize: 20, transform: "rotate(-12deg)", opacity: Math.min(dragX/80,1) }}>LIKE ✓</div>}
                  {dragX < -20 && <div style={{ position: "absolute", top: 24, right: 24, zIndex: 10, border: "3px solid #ff4444", borderRadius: 8, padding: "6px 16px", color: "#ff4444", fontWeight: 900, fontSize: 20, transform: "rotate(12deg)", opacity: Math.min(-dragX/80,1) }}>NOPE ✗</div>}
                  <div {...handlers} style={{ background: CARD_BG, borderRadius: 20, overflow: "hidden", border: `1px solid ${BORDER}`, transform: `translateX(${dragX}px) rotate(${rot}deg)`, transition: dragging ? "none" : "transform 0.3s ease", cursor: "grab", boxShadow: dragX > 20 ? `0 0 30px ${NEON}44` : dragX < -20 ? "0 0 30px #ff444444" : "0 8px 40px #00000088" }}>
                    <div style={{ position: "relative", height: 300 }}>
                      {(() => {
                        const photos = [current.photo_url, current.photo_url_2].filter(Boolean);
                        const photo = photos[cardPhotoIndex] || null;
                        return photo
                          ? <img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} draggable={false} />
                          : <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${NEON}22, #000)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, color: NEON }}>{current.name?.[0] || "?"}</div>;
                      })()}
                      {[current.photo_url, current.photo_url_2].filter(Boolean).length > 1 && (
                        <>
                          <div style={{ position: "absolute", top: 10, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
                            {[current.photo_url, current.photo_url_2].filter(Boolean).map((_, i) => (
                              <div key={i} onClick={(e) => { e.stopPropagation(); setCardPhotoIndex(i); }} style={{ width: 8, height: 8, borderRadius: "50%", background: i === cardPhotoIndex ? "#fff" : "#ffffff55", cursor: "pointer" }} />
                            ))}
                          </div>
                          <div onClick={() => setCardPhotoIndex(i => Math.max(0, i - 1))} style={{ position: "absolute", left: 0, top: 0, width: "40%", height: "100%", cursor: "pointer" }} />
                          <div onClick={() => setCardPhotoIndex(i => Math.min(1, i + 1))} style={{ position: "absolute", right: 0, top: 0, width: "40%", height: "100%", cursor: "pointer" }} />
                        </>
                      )}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, #000000ee)", padding: "36px 20px 18px" }}>
                        <div style={{ color: "#fff", fontWeight: 900, fontSize: 22, display: "flex", alignItems: "center", gap: 8 }}>
                          {current.name || "?"}{current.age ? `, ${current.age}` : ""}
                          {current.verified && (
                            <span onClick={() => setVerifiedPopup(true)} style={{ color: BLUE, fontSize: 18, cursor: "pointer" }} title={t.verified}>✓</span>
                          )}
                        </div>
                        <div style={{ color: NEON, fontSize: 13 }}>{current.country}</div>
                      </div>
                    </div>
                    <div style={{ padding: "12px 18px 16px" }}>
                      {current.bio && <div style={{ color: "#aaa", fontSize: 13, marginBottom: 10, lineHeight: 1.5 }}>{current.bio}</div>}
                      {(current.wanted_countries||[]).length > 0 && <TagRow label={t.wants} tags={current.wanted_countries} color={NEON} />}
                      {(current.languages||[]).length > 0 && <TagRow label={t.speaks} tags={current.languages} color="#666" />}
                      {(current.hobbies||[]).length > 0 && <TagRow label={t.interests} tags={current.hobbies} color="#444" />}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
                  <button onClick={handleDislike} style={{ width: 58, height: 58, borderRadius: "50%", background: SURFACE, border: "1px solid #333", color: "#ff4444", fontSize: 22, cursor: "pointer" }}>✕</button>
                  <button onClick={handleLike} style={{ width: 58, height: 58, borderRadius: "50%", background: SURFACE, border: `1px solid ${NEON}44`, color: NEON, fontSize: 22, cursor: "pointer", boxShadow: `0 0 16px ${NEON}33` }}>♥</button>
                </div>
              </>
            ) : (
              <div style={{ color: "#555", textAlign: "center", marginTop: 60 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🌍</div>
                <div style={{ fontSize: 14 }}>{t.noMore}</div>
              </div>
            )}
          </div>
        )}

        {/* MATCHES - Redesigned */}
        {activeTab === "matches" && (
          <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 120px)" }}>
            {matches.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 24px" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🌍</div>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, marginBottom: 8 }}>{t.noMatches}</div>
                <div style={{ color: "#555", fontSize: 14, lineHeight: 1.6 }}>{t.noMatchesSub}</div>
                <button onClick={() => setActiveTab("swipe")} style={{ marginTop: 24, background: NEON, color: DARK, border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 900, cursor: "pointer", fontFamily: "inherit", fontSize: 14, boxShadow: `0 0 16px ${NEON}44` }}>
                  {t.swipe} →
                </button>
              </div>
            ) : (
              <>
                {/* Story bubbles */}
                <div style={{ padding: "20px 16px 12px" }}>
                  <div style={{ color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>{t.newMatches}</div>
                  <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
                    {matches.map(m => (
                      <div key={m.id} onClick={() => { setActiveChat(m); setActiveTab("chat"); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", flexShrink: 0 }}>
                        <div style={{ width: 64, height: 64, borderRadius: "50%", padding: 2, background: `linear-gradient(135deg, ${NEON}, #ff4444)` }}>
                          <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: `2px solid ${DARK}`, overflow: "hidden" }}>
                            {m.photo_url
                              ? <img src={m.photo_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              : <div style={{ width: "100%", height: "100%", background: `${NEON}22`, display: "flex", alignItems: "center", justifyContent: "center", color: NEON, fontWeight: 900, fontSize: 22 }}>{m.name?.[0]}</div>
                            }
                          </div>
                        </div>
                        <div style={{ color: "#aaa", fontSize: 11, maxWidth: 64, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name?.split(" ")[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: BORDER, margin: "0 16px" }} />

                {/* Chat list */}
                <div style={{ padding: "16px 16px 0" }}>
                  <div style={{ color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>{t.recentChats}</div>
                  {matches.map(m => (
                    <div key={m.id} onClick={() => { setActiveChat(m); setActiveTab("chat"); }}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${BORDER}`, cursor: "pointer" }}>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <Avatar p={m} size={52} />
                        <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", background: NEON, border: `2px solid ${DARK}` }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                          {m.name}
                          {m.verified && <span style={{ color: BLUE, fontSize: 13 }}>✓</span>}
                        </div>
                        <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>{m.country}</div>
                      </div>
                      <div style={{ color: NEON, fontSize: 18 }}>→</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* CHAT */}
        {activeTab === "chat" && (
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
            {activeChat ? (
              <>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <button onClick={() => { setActiveChat(null); setChatMessages([]); }} style={{ background: "none", border: "none", color: NEON, cursor: "pointer", fontSize: 18 }}>←</button>
                  <Avatar p={activeChat} size={36} />
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                      {activeChat.name}
                      {activeChat.verified && <span onClick={() => setVerifiedPopup(true)} style={{ color: BLUE, fontSize: 14, cursor: "pointer" }}>✓</span>}
                    </div>
                    <div style={{ color: NEON, fontSize: 11 }}>{activeChat.country}</div>
                  </div>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  {chatMessages.length === 0 && <div style={{ color: "#444", fontSize: 13, textAlign: "center", marginTop: 40 }}>🌍 Match! Schreib die erste Nachricht.</div>}
                  {chatMessages.map((msg, i) => {
                    const isMe = msg.sender_id === session?.user?.id;
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                        <div style={{ maxWidth: "72%" }}>
                          <div style={{ background: isMe ? NEON : SURFACE, color: isMe ? DARK : "#fff", padding: "10px 14px", borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px", fontSize: 14, border: isMe ? "none" : `1px solid ${BORDER}` }}>
                            {msg.content}
                          </div>
                          {isMe && (
                            <div style={{ fontSize: 10, color: "#555", marginTop: 2, textAlign: "right", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4 }}>
                              {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              {msg.seen ? <span style={{ color: "#4CAF50", fontSize: 12 }}>✓✓</span> : i < chatMessages.length - 1 ? <span style={{ color: "#777", fontSize: 12 }}>✓✓</span> : <span style={{ color: "#777", fontSize: 12 }}>✓</span>}
                            </div>
                          )}
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
                  : matches.map(m => (
                    <div key={m.id} onClick={() => setActiveChat(m)}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${BORDER}`, cursor: "pointer" }}>
                      <Avatar p={m} size={52} />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#fff", fontWeight: 700 }}>{m.name}</div>
                        <div style={{ color: "#555", fontSize: 12 }}>{m.country}</div>
                      </div>
                      <div style={{ color: NEON }}>→</div>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div style={{ padding: 20, overflowY: "auto", maxHeight: "calc(100vh - 120px)" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 12 }}>
                <div style={{ position: "relative" }}>
                  <Avatar p={profile || {}} size={80} large />
                  <button onClick={() => fileInputRef.current?.click()} style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%", background: NEON, border: "none", cursor: "pointer", fontSize: 12 }}>📷</button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={e => handlePhotoUpload(e, 1)} style={{ display: "none" }} />
                  <div style={{ color: "#555", fontSize: 10, marginTop: 4 }}>{t.photo1}</div>
                  {photoUploading && <div style={{ color: NEON, fontSize: 10 }}>{t.uploading}</div>}
                </div>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", border: `2px dashed ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden" }} onClick={() => fileInput2Ref.current?.click()}>
                    {profile?.photo_url_2 ? <img src={profile.photo_url_2} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ color: "#444", fontSize: 24 }}>+</span>}
                  </div>
                  <input ref={fileInput2Ref} type="file" accept="image/*" onChange={e => handlePhotoUpload(e, 2)} style={{ display: "none" }} />
                  <div style={{ color: "#555", fontSize: 10, marginTop: 4, textAlign: "center" }}>{t.photo2}</div>
                  {photo2Uploading && <div style={{ color: NEON, fontSize: 10 }}>{t.uploading}</div>}
                </div>
              </div>
              <div style={{ color: "#fff", fontWeight: 900, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {profile?.name || "—"}
                {profile?.verified && <span onClick={() => setVerifiedPopup(true)} style={{ color: BLUE, fontSize: 18, cursor: "pointer" }}>✓</span>}
              </div>
              <div style={{ color: NEON, fontSize: 13 }}>{profile?.country || ""}</div>
            </div>

            {[{ key: "name", label: t.name }, { key: "age", label: t.age, type: "number" }].map(({ key, label, type }) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{label}</div>
                <input type={type || "text"} value={profileForm[key]} onChange={e => { setProfileForm({...profileForm, [key]: e.target.value}); if (key === "age") setAgeError(""); }} placeholder={label} style={inputStyle} />
                {key === "age" && ageError && <div style={{ color: "#ff4444", fontSize: 12, marginTop: 4 }}>{ageError}</div>}
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{t.country}</div>
              <CountrySelect value={profileForm.country} onChange={v => setProfileForm({...profileForm, country: v})} placeholder={t.searchCountry} lang={lang} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{t.wantedCountry}</div>
              <MultiCountrySelect value={profileForm.wanted_countries} onChange={v => setProfileForm({...profileForm, wanted_countries: v})} placeholder={t.searchCountry} lang={lang} />
            </div>
            {[{ key: "languages", label: t.languages }, { key: "hobbies", label: t.hobbies }].map(({ key, label }) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{label}</div>
                <input value={profileForm[key]} onChange={e => setProfileForm({...profileForm, [key]: e.target.value})} placeholder={label} style={inputStyle} />
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

      {/* Filter Modal */}
      {showFilter && (
        <div style={{ position: "fixed", inset: 0, background: "#000000bb", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "20px 20px 0 0", padding: 24, width: "100%", maxWidth: 480 }}>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 18, marginBottom: 20 }}>⚙️ {t.filterTitle}</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{t.filterCountry}</div>
              <CountrySelect value={filter.country} onChange={v => setFilter({...filter, country: v})} placeholder={t.allCountries} lang={lang} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{t.filterAge}</div>
              <div style={{ display: "flex", gap: 10 }}>
                <input type="number" value={filter.ageMin} onChange={e => setFilter({...filter, ageMin: e.target.value})} placeholder={t.from + " 13"} style={{ ...inputStyle, flex: 1 }} />
                <input type="number" value={filter.ageMax} onChange={e => setFilter({...filter, ageMax: e.target.value})} placeholder={t.to + " 25"} style={{ ...inputStyle, flex: 1 }} />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{t.filterLang}</div>
              <input value={filter.language} onChange={e => setFilter({...filter, language: e.target.value})} placeholder={t.allLangs} style={inputStyle} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={resetFilter} style={{ flex: 1, background: "transparent", color: "#666", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "13px", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>{t.resetFilter}</button>
              <button onClick={applyFilter} style={{ flex: 2, background: NEON, color: DARK, border: "none", borderRadius: 8, padding: "13px", fontWeight: 900, cursor: "pointer", fontFamily: "inherit", fontSize: 14, boxShadow: `0 0 16px ${NEON}44` }}>{t.applyFilter}</button>
            </div>
            <div onClick={() => setShowFilter(false)} style={{ color: "#444", fontSize: 12, textAlign: "center", marginTop: 14, cursor: "pointer" }}>✕ {t.back}</div>
          </div>
        </div>
      )}

      {/* Verified Popup */}
      {verifiedPopup && (
        <div onClick={() => setVerifiedPopup(false)} style={{ position: "fixed", inset: 0, background: "#000000bb", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BLUE}`, borderRadius: 16, padding: "20px 28px", textAlign: "center", maxWidth: 280, boxShadow: `0 0 30px ${BLUE}44` }}>
            <div style={{ color: BLUE, fontSize: 36, marginBottom: 10 }}>✓</div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 16, marginBottom: 6 }}>{t.verified}</div>
            <div style={{ color: "#aaa", fontSize: 13, lineHeight: 1.5 }}>{t.verifiedMsg}</div>
          </div>
        </div>
      )}

      {/* Match Popup */}
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

      {/* Bottom Nav */}
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
function EmptyState({ icon, text }) {
  return <div style={{ color: "#555", textAlign: "center", padding: 48 }}><div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div><div style={{ fontSize: 14 }}>{text}</div></div>;
}
const inputStyle = { background: DARK, color: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "11px 13px", fontSize: 14, fontFamily: "'Courier New', monospace", outline: "none", width: "100%", boxSizing: "border-box" };
