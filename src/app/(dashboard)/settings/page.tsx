// src/app/(dashboard)/settings/page.tsx
"use client";

import { useState } from "react";
import { useTheme } from "@/constants/theme/ThemeContext";

function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex justify-between items-center py-4">
      <div>
        <p className="text-white font-semibold">{label}</p>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-green-500 transition-colors"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:left-6 transition-all"></div>
      </label>
    </div>
  );
}

export default function SettingsPage() {
  // theme from your ThemeContext
  const { theme, toggleTheme } = useTheme();

  // local UI state for the non-functional toggles:
  const [twoFA, setTwoFA] = useState(true);
  const [mobilePush, setMobilePush] = useState(true);
  const [desktopNotif, setDesktopNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== theme) {
      toggleTheme();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">You are now on the Settings page.</p>
      </div>

      {/* card */}
      <div className="bg-[#1A1A1A] border border-gray-700 rounded-lg p-6 space-y-6">
        {/* Appearance */}
        {/* <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <p className="text-white font-semibold">Appearance</p>
            <p className="text-gray-400 text-sm">
              Customize how your theme looks on your device
            </p>
          </div>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="bg-transparent border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div> */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <p className="text-white font-semibold">Appearance</p>
            <p className="text-gray-400 text-sm">
              Customize how your theme looks on your device
            </p>
          </div>
          <div className="flex justify-end">
            <select
              value={theme}
              onChange={handleThemeChange}
              className="w-36 bg-transparent border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        {/* Language */}
        {/* <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <p className="text-white font-semibold">Language</p>
            <p className="text-gray-400 text-sm">Select your language</p>
          </div>
          <select
            className="bg-transparent border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
            disabled
          >
            <option>English</option>
          </select>
        </div> */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <p className="text-white font-semibold">Language</p>
            <p className="text-gray-400 text-sm">Select your language</p>
          </div>
          <div className="flex justify-end">
            <select
              className="w-36 bg-transparent border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              disabled
            >
              <option>English</option>
            </select>
          </div>
        </div>

        <hr className="border-gray-700" />

        {/* Non-functional toggles */}
        <SettingToggle
          label="Two-factor Authentication"
          description="Keep your account secure by enabling 2FA via mail"
          checked={twoFA}
          onChange={() => setTwoFA((v) => !v)}
        />
        <hr className="border-gray-700" />

        <SettingToggle
          label="Mobile Push Notifications"
          description="Receive push notification"
          checked={mobilePush}
          onChange={() => setMobilePush((v) => !v)}
        />
        <hr className="border-gray-700" />

        <SettingToggle
          label="Desktop Notification"
          description="Receive push notification in desktop"
          checked={desktopNotif}
          onChange={() => setDesktopNotif((v) => !v)}
        />
        <hr className="border-gray-700" />

        <SettingToggle
          label="Email Notifications"
          description="Receive email notification"
          checked={emailNotif}
          onChange={() => setEmailNotif((v) => !v)}
        />
      </div>
    </div>
  );
}
