import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Download,
  Share,
  PlusSquare,
  CheckCircle2,
  Sparkles,
  Zap,
  WifiOff,
  BellRing,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  onPromptInstall: () => Promise<'accepted' | 'dismissed' | 'unsupported'>;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  isIOS,
  isAndroid,
  onPromptInstall,
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'apk_guide' | 'ios' | 'build_apk'>(
    isIOS ? 'ios' : 'quick'
  );
  const [installStatus, setInstallStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setInstallStatus('launching');
    const result = await onPromptInstall();
    if (result === 'accepted') {
      setInstallStatus('success');
      setTimeout(() => {
        onClose();
        setInstallStatus(null);
      }, 2500);
    } else if (result === 'dismissed') {
      setInstallStatus('dismissed');
    } else {
      // unsupported - switch to manual guide tab
      setInstallStatus('manual');
      setActiveTab(isIOS ? 'ios' : 'apk_guide');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with App Identity */}
        <div className="bg-gradient-to-r from-[#07152E] via-[#0B1B3D] to-[#1E3A8A] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close install modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-lg flex items-center justify-center shrink-0 border border-white/20">
              <img
                src="/pwa-192x192.png"
                alt="Flymego Tours App Icon"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF7A00] text-white uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                Mobile App & WebAPK
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-white">
                Flymego Tours Mobile App
              </h2>
              <p className="text-xs text-slate-300">
                Install as a native application on Android & iOS
              </p>
            </div>
          </div>

          {/* Quick specs pill */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified & Secure
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Install (0 MB storage)
            </span>
            <span className="flex items-center gap-1">
              <WifiOff className="w-3.5 h-3.5 text-blue-300" /> Offline Ready
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-4 pt-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('quick')}
            className={`px-3 py-2 border-b-2 transition-colors ${
              activeTab === 'quick'
                ? 'border-[#FF7A00] text-[#0B1B3D] font-bold bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            1-Click Install
          </button>
          <button
            onClick={() => setActiveTab('apk_guide')}
            className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1 ${
              activeTab === 'apk_guide'
                ? 'border-[#FF7A00] text-[#0B1B3D] font-bold bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Android (WebAPK)</span>
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`px-3 py-2 border-b-2 transition-colors ${
              activeTab === 'ios'
                ? 'border-[#FF7A00] text-[#0B1B3D] font-bold bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            iPhone / iPad
          </button>
          <button
            onClick={() => setActiveTab('build_apk')}
            className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1 ${
              activeTab === 'build_apk'
                ? 'border-[#FF7A00] text-[#0B1B3D] font-bold bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Raw APK Info</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 grow text-slate-700 text-sm">
          {isInstalled && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-emerald-900 text-xs sm:text-sm">
                  App Already Installed!
                </p>
                <p className="text-xs text-emerald-700">
                  You are already running Flymego Tours as an installed application on your device home screen.
                </p>
              </div>
            </div>
          )}

          {/* TAB 1: Quick 1-Click Install */}
          {activeTab === 'quick' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#FF7A00]" />
                  Why Install the Flymego Tours App?
                </h3>
                <ul className="text-xs space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-1.5 shrink-0" />
                    <span>
                      <strong>Native App Launcher Icon:</strong> Access Flymego Tours directly from your phone's app drawer or home screen.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-1.5 shrink-0" />
                    <span>
                      <strong>Full-Screen Immersive Experience:</strong> No browser URL bars or navigation clutter — feels like a real native APK.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-1.5 shrink-0" />
                    <span>
                      <strong>Offline Access:</strong> Browse holiday packages and saved itineraries even without an active internet connection.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-1.5 shrink-0" />
                    <span>
                      <strong>Fast Loading:</strong> Instant startup with zero lag and automatic updates.
                    </span>
                  </li>
                </ul>
              </div>

              {installStatus === 'success' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  App installation initiated! Check your phone's home screen or app drawer.
                </div>
              )}

              {installStatus === 'dismissed' && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-semibold">
                  Install prompt was dismissed. You can install anytime using the button below or browser menu.
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-sm"
                >
                  <Download className="w-5 h-5" />
                  <span>
                    {isInstallable ? 'Install App / APK on Device Now' : 'Install Flymego App'}
                  </span>
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  On Android, this generates a native WebAPK with an app drawer icon.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Android (WebAPK) Manual Guide */}
          {activeTab === 'apk_guide' && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                <p className="font-bold mb-1">Android WebAPK Technology</p>
                <p>
                  Google Chrome and Android automatically package this app into an Android package file (WebAPK), registering it as an installed app in your Android Settings and App Drawer.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Open in Chrome or Edge on Android</p>
                    <p className="text-slate-600 mt-0.5">
                      Ensure you are viewing this page on your Android device in Google Chrome, Samsung Internet, or Brave.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Tap Browser Menu (3 Dots)</p>
                    <p className="text-slate-600 mt-0.5">
                      Tap the <strong>⋮</strong> menu icon in the top-right corner of Chrome.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Select "Install app" or "Add to Home screen"</p>
                    <p className="text-slate-600 mt-0.5">
                      Chrome will automatically generate the Android package, show a confirmation prompt, and install the Flymego icon into your phone's app list.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleInstallClick}
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-[#0B1B3D] hover:bg-[#1E3A8A] flex items-center justify-center gap-2 text-xs transition-colors"
              >
                <Download className="w-4 h-4 text-[#FF7A00]" />
                <span>Try Direct One-Tap Install</span>
              </button>
            </div>
          )}

          {/* TAB 3: iOS (iPhone / iPad) Guide */}
          {activeTab === 'ios' && (
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900">
                <p className="font-bold mb-1">Apple iOS Installation</p>
                <p>
                  iOS does not support third-party APK files directly, but Safari allows you to install this web app as a standalone home screen app with custom icon and splash screen.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Open in Safari</p>
                    <p className="text-slate-600 mt-0.5">
                      Make sure you are viewing this page in Apple Safari on your iPhone or iPad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Tap Share Button</span>
                      <Share className="w-3.5 h-3.5 text-blue-600" />
                    </p>
                    <p className="text-slate-600">
                      Tap the blue <strong>Share</strong> button at the bottom navigation bar of Safari.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Select "Add to Home Screen"</span>
                      <PlusSquare className="w-3.5 h-3.5 text-slate-700" />
                    </p>
                    <p className="text-slate-600">
                      Scroll down and tap <strong>Add to Home Screen</strong>, then tap <strong>Add</strong> in the top-right corner.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Raw APK & Developer Packaging Info */}
          {activeTab === 'build_apk' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
                <p className="font-bold mb-1">Want a Standalone .APK File for Sideloading?</p>
                <p>
                  This web app is 100% PWA-compliant with standard Web App Manifest (`manifest.webmanifest`), service workers, and maskable icons.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <p className="font-bold text-slate-800">1. Instant WebAPK (Recommended):</p>
                <p className="text-slate-600">
                  When you tap <strong>Install</strong> on any modern Android device, Android’s WebAPK service generates a signed `.apk` file behind the scenes and installs it into the OS package manager automatically.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <p className="font-bold text-slate-800">2. Packaging as Sideloadable `.apk` or Google Play Store TWA:</p>
                <p className="text-slate-600">
                  You can convert this manifest into a standalone signed Android `.apk` or `.aab` in 1 minute using:
                </p>
                <ul className="list-disc pl-4 text-slate-600 space-y-1">
                  <li>
                    <strong>PWABuilder (by Microsoft):</strong> Free tool to package any PWA into an Android APK ready for sideloading or Play Store submission.
                  </li>
                  <li>
                    <strong>Bubblewrap CLI:</strong> Official Google tool to build Trusted Web Activity (TWA) Android APKs.
                  </li>
                  <li>
                    <strong>Capacitor / Cordova:</strong> Wrap the `/dist` output directory into a native Android Studio project.
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl text-[11px] text-slate-600">
                <span>App Package ID:</span>
                <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-mono">
                  com.flymegotours.app
                </code>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-slate-400" />
            Flymego App v1.2.0
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
