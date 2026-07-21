import { useState, useEffect } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { FaIdCard } from "react-icons/fa";
import MobileNavMenu from "./SharedComponents/MobileNavMenu";
import type {
  CardData,
  SavedCardEntry,
  CrewCardData,
  SavedCrewCardEntry,
  UpgradeCardData,
  SavedUpgradeCardEntry,
  CardGroupData,
  SavedGroupEntry,
} from "./types";
import StatCard from "./StatCard/StatCard";
import CrewCard from "./CrewCard/CrewCard";
import UpgradeCard from "./UpgradeCard/UpgradeCard";
import GroupCard from "./GroupCard/GroupCard";
import CardLibrary from "./CardLibrary/CardLibrary";

export const defaultCard: CardData = {
  name: "",
  title: "",
  cost: "",
  df: "",
  wp: "",
  sp: "",
  sz: "",
  stn: "",
  station: "",
  stationCount: "",
  isTotem: false,
  characteristics: [],
  keyword: "",
  abilities: [],
  health: 0,
  masterLeftText: "",
  masterRightText: "",
  imageUrl: "",
  faction: "",
  actions: [],
  baseSize: "30mm",
};

const defaultCrewCard: CrewCardData = {
  name: "",
  master: "",
  keyword: "",
  faction: "",
  imageUrl: "",
  crewAbility: "",
  abilityGroups: [],
  triggerGroups: [],
  actionGroups: [],
  markers: [],
  tokens: [],
};

const defaultUpgradeCard: UpgradeCardData = {
  faction: "",
  upgradeType: "",
  name: "",
  upgradeEffect: "",
  abilities: [],
  triggerActionType: "attack",
  triggerPrintedOnStatCard: false,
  triggers: [],
  actions: [],
  limitation: "-",
};

const defaultGroup: CardGroupData = {
  name: "",
  crewCardId: null,
  statCardIds: [],
  upgradeCardIds: [],
};

const SAVES_KEY = "malifaux-saved-cards";
const LEGACY_KEY = "malifaux-card";
const CREW_SAVES_KEY = "malifaux-saved-crew-cards";
const UPGRADE_SAVES_KEY = "malifaux-saved-upgrade-cards";
const GROUP_SAVES_KEY = "malifaux-saved-groups";

// Cards saved before symbols were switched from raw emoji to "[token]"
// strings still have emoji baked into their JSON. Rewrite it in place
// (both in dedicated fields like Suit/TriggerActionType and inline within
// free text like ability/token descriptions) so old saves keep rendering.
const EMOJI_TO_TOKEN: [string, string][] = [
  ["🗡️", "[melee]"],
  ["🗡", "[melee]"],
  ["🛡️", "[physical]"],
  ["🛡", "[physical]"],
  ["🐏", "[ram]"],
  ["🦅", "[crow]"],
  ["📖", "[tome]"],
  ["🎭", "[mask]"],
  ["💎", "[stone]"],
  ["🔫", "[missile]"],
  ["✨", "[magic]"],
  ["🔮", "[magical]"],
  ["🪬", "[unusual]"],
  ["⚡", "[signature]"],
];

function migrateEmojiSymbols(raw: string): string {
  let result = raw;
  for (const [emoji, token] of EMOJI_TO_TOKEN) {
    if (result.includes(emoji)) result = result.split(emoji).join(token);
  }
  return result;
}

function loadSavedCards(): SavedCardEntry[] {
  try {
    const legacy = localStorage.getItem(LEGACY_KEY);
    const existing = localStorage.getItem(SAVES_KEY);
    if (legacy && !existing) {
      const card = {
        ...defaultCard,
        ...JSON.parse(migrateEmojiSymbols(legacy)),
      };
      const entry: SavedCardEntry = {
        id: crypto.randomUUID(),
        label: card.name || "Imported",
        card,
      };
      localStorage.removeItem(LEGACY_KEY);
      return [entry];
    }
    if (existing) return JSON.parse(migrateEmojiSymbols(existing));
  } catch {}
  return [];
}

function loadSavedCrewCards(): SavedCrewCardEntry[] {
  try {
    const existing = localStorage.getItem(CREW_SAVES_KEY);
    if (existing) return JSON.parse(migrateEmojiSymbols(existing));
  } catch {}
  return [];
}

function loadSavedUpgradeCards(): SavedUpgradeCardEntry[] {
  try {
    const existing = localStorage.getItem(UPGRADE_SAVES_KEY);
    if (existing) return JSON.parse(migrateEmojiSymbols(existing));
  } catch {}
  return [];
}

function loadSavedGroups(): SavedGroupEntry[] {
  try {
    const existing = localStorage.getItem(GROUP_SAVES_KEY);
    if (existing) return JSON.parse(existing);
  } catch {}
  return [];
}

type TabValue = "stat" | "crew" | "upgrade" | "group";

const TAB_ITEMS: { value: TabValue; label: string }[] = [
  { value: "stat", label: "Model" },
  { value: "crew", label: "Crew" },
  { value: "upgrade", label: "Upgrade" },
  { value: "group", label: "Group" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabValue>("stat");

  // Stat card state
  const [savedCards, setSavedCards] =
    useState<SavedCardEntry[]>(loadSavedCards);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [card, setCard] = useState<CardData>(defaultCard);

  // Crew card state
  const [savedCrewCards, setSavedCrewCards] =
    useState<SavedCrewCardEntry[]>(loadSavedCrewCards);
  const [currentCrewId, setCurrentCrewId] = useState<string | null>(null);
  const [crewCard, setCrewCard] = useState<CrewCardData>(defaultCrewCard);

  // Upgrade card state
  const [savedUpgradeCards, setSavedUpgradeCards] = useState<
    SavedUpgradeCardEntry[]
  >(loadSavedUpgradeCards);
  const [currentUpgradeId, setCurrentUpgradeId] = useState<string | null>(null);
  const [upgradeCard, setUpgradeCard] =
    useState<UpgradeCardData>(defaultUpgradeCard);

  // Group state
  const [savedGroups, setSavedGroups] =
    useState<SavedGroupEntry[]>(loadSavedGroups);
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
  const [group, setGroup] = useState<CardGroupData>(defaultGroup);

  useEffect(() => {
    localStorage.setItem(SAVES_KEY, JSON.stringify(savedCards));
  }, [savedCards]);

  useEffect(() => {
    localStorage.setItem(CREW_SAVES_KEY, JSON.stringify(savedCrewCards));
  }, [savedCrewCards]);

  useEffect(() => {
    localStorage.setItem(UPGRADE_SAVES_KEY, JSON.stringify(savedUpgradeCards));
  }, [savedUpgradeCards]);

  useEffect(() => {
    localStorage.setItem(GROUP_SAVES_KEY, JSON.stringify(savedGroups));
  }, [savedGroups]);

  // Stat card handlers
  const handleSave = () => {
    if (currentId) {
      setSavedCards((prev) =>
        prev.map((e) =>
          e.id === currentId ? { ...e, label: card.name, card } : e,
        ),
      );
    } else {
      const entry: SavedCardEntry = {
        id: crypto.randomUUID(),
        label: card.name,
        card,
      };
      setSavedCards((prev) => [...prev, entry]);
      setCurrentId(entry.id);
    }
  };

  const handleNew = () => {
    setCard(defaultCard);
    setCurrentId(null);
  };

  const handleLoad = (id: string) => {
    const entry = savedCards.find((e) => e.id === id);
    if (entry) {
      setCard(entry.card);
      setCurrentId(id);
    }
  };

  const handleDelete = () => {
    if (!currentId) return;
    setSavedCards((prev) => prev.filter((e) => e.id !== currentId));
    handleNew();
  };

  // Crew card handlers
  const handleCrewSave = () => {
    const label = crewCard.name || "Untitled";
    if (currentCrewId) {
      setSavedCrewCards((prev) =>
        prev.map((e) =>
          e.id === currentCrewId ? { ...e, label, card: crewCard } : e,
        ),
      );
    } else {
      const entry: SavedCrewCardEntry = {
        id: crypto.randomUUID(),
        label,
        card: crewCard,
      };
      setSavedCrewCards((prev) => [...prev, entry]);
      setCurrentCrewId(entry.id);
    }
  };

  const handleCrewNew = () => {
    setCrewCard(defaultCrewCard);
    setCurrentCrewId(null);
  };

  const handleCrewLoad = (id: string) => {
    const entry = savedCrewCards.find((e) => e.id === id);
    if (entry) {
      setCrewCard({ ...defaultCrewCard, ...entry.card });
      setCurrentCrewId(id);
    }
  };

  const handleCrewDelete = () => {
    if (!currentCrewId) return;
    setSavedCrewCards((prev) => prev.filter((e) => e.id !== currentCrewId));
    handleCrewNew();
  };

  // Upgrade card handlers
  const handleUpgradeSave = () => {
    const label = upgradeCard.name || "Untitled";
    if (currentUpgradeId) {
      setSavedUpgradeCards((prev) =>
        prev.map((e) =>
          e.id === currentUpgradeId ? { ...e, label, card: upgradeCard } : e,
        ),
      );
    } else {
      const entry: SavedUpgradeCardEntry = {
        id: crypto.randomUUID(),
        label,
        card: upgradeCard,
      };
      setSavedUpgradeCards((prev) => [...prev, entry]);
      setCurrentUpgradeId(entry.id);
    }
  };

  const handleUpgradeNew = () => {
    setUpgradeCard(defaultUpgradeCard);
    setCurrentUpgradeId(null);
  };

  const handleUpgradeLoad = (id: string) => {
    const entry = savedUpgradeCards.find((e) => e.id === id);
    if (entry) {
      setUpgradeCard({ ...defaultUpgradeCard, ...entry.card });
      setCurrentUpgradeId(id);
    }
  };

  const handleUpgradeDelete = () => {
    if (!currentUpgradeId) return;
    setSavedUpgradeCards((prev) =>
      prev.filter((e) => e.id !== currentUpgradeId),
    );
    handleUpgradeNew();
  };

  // Group handlers
  const handleGroupSave = () => {
    const label = group.name || "Untitled";
    if (currentGroupId) {
      setSavedGroups((prev) =>
        prev.map((e) => (e.id === currentGroupId ? { ...e, label, group } : e)),
      );
    } else {
      const entry: SavedGroupEntry = {
        id: crypto.randomUUID(),
        label,
        group,
      };
      setSavedGroups((prev) => [...prev, entry]);
      setCurrentGroupId(entry.id);
    }
  };

  const handleGroupNew = () => {
    setGroup(defaultGroup);
    setCurrentGroupId(null);
  };

  const handleGroupLoad = (id: string) => {
    const entry = savedGroups.find((e) => e.id === id);
    if (entry) {
      setGroup({ ...defaultGroup, ...entry.group });
      setCurrentGroupId(id);
    }
  };

  const handleGroupDelete = () => {
    if (!currentGroupId) return;
    setSavedGroups((prev) => prev.filter((e) => e.id !== currentGroupId));
    handleGroupNew();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <AppBar
        position="static"
        color="default"
        elevation={1}
        sx={{ flexShrink: 0 }}
      >
        <Toolbar variant="dense" disableGutters sx={{ pl: 2 }}>
          <Box
            component="a"
            href="https://blakesteel.com"
            sx={{
              display: { xs: "none", sm: "block" },
              mr: 3,
              flexShrink: 0,
              textDecoration: "none",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, letterSpacing: 0, color: "#5aa348" }}
            >
              Malifaux Card Creator
            </Typography>
          </Box>
          <Box
            component="a"
            href="https://blakesteel.com"
            sx={{
              display: { xs: "flex", sm: "none" },
              mr: 2,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <FaIdCard size={24} color="#5aa348" />
          </Box>
          <Tabs
            value={activeTab}
            onChange={(_, v: TabValue) => setActiveTab(v)}
            textColor="primary"
            indicatorColor="primary"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            {TAB_ITEMS.map((t) => (
              <Tab key={t.value} label={t.label} value={t.value} />
            ))}
          </Tabs>
          <MobileNavMenu
            tabs={TAB_ITEMS}
            activeTab={activeTab}
            onSelect={setActiveTab}
          />
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {activeTab === "stat" && (
          <>
            <CardLibrary
              savedCards={savedCards}
              currentId={currentId}
              onSave={handleSave}
              onNew={handleNew}
              onLoad={handleLoad}
              onDelete={handleDelete}
            />
            <StatCard card={card} onChange={setCard} />
          </>
        )}
        {activeTab === "crew" && (
          <>
            <CardLibrary
              savedCards={savedCrewCards}
              currentId={currentCrewId}
              onSave={handleCrewSave}
              onNew={handleCrewNew}
              onLoad={handleCrewLoad}
              onDelete={handleCrewDelete}
            />
            <CrewCard card={crewCard} onChange={setCrewCard} />
          </>
        )}
        {activeTab === "upgrade" && (
          <>
            <CardLibrary
              savedCards={savedUpgradeCards}
              currentId={currentUpgradeId}
              onSave={handleUpgradeSave}
              onNew={handleUpgradeNew}
              onLoad={handleUpgradeLoad}
              onDelete={handleUpgradeDelete}
            />
            <UpgradeCard card={upgradeCard} onChange={setUpgradeCard} />
          </>
        )}
        {activeTab === "group" && (
          <>
            <CardLibrary
              savedCards={savedGroups}
              currentId={currentGroupId}
              onSave={handleGroupSave}
              onNew={handleGroupNew}
              onLoad={handleGroupLoad}
              onDelete={handleGroupDelete}
            />
            <GroupCard
              group={group}
              onChange={setGroup}
              statCards={savedCards}
              crewCards={savedCrewCards}
              upgradeCards={savedUpgradeCards}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
