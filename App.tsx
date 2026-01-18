import React, { useState } from 'react';
import { 
  Home, 
  User, 
  Briefcase, 
  Cpu, 
  MessageSquare, 
  Palette,
  ExternalLink,
  Code2
} from 'lucide-react';
import { THEMES, PROJECTS, SOCIALS, BIO_LONG } from './constants';
import { ThemeConfig, ThemeId } from './types';
import { TypeWriter } from './components/TypeWriter';
import { ApiShowcase } from './components/ApiShowcase';
import { ChatBot } from './components/ChatBot';

type Tab = 'home' | 'journey' | 'projects' | 'api' | 'chat';

const App = () => {
  const [activeTheme, setActiveTheme] = useState<ThemeId>('techy');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const theme: ThemeConfig = THEMES[activeTheme];

  const NavButton = ({ tab, icon: Icon, label }: { tab: Tab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex flex-col items-center justify-center p-2 flex-1 transition-all duration-300 ${
        activeTab === tab 
          ? `${theme.colors.accent} scale-110` 
          : `${theme.colors.muted} hover:${theme.colors.text}`
      }`}
    >
      <Icon size={20} className="mb-1" />
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen ${theme.colors.bg} ${theme.colors.text} ${theme.font} transition-colors duration-500`}>
      
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 h-16 ${theme.colors.surface}/90 backdrop-blur-md border-b ${theme.colors.border} z-50 flex items-center justify-between px-6`}>
        <div className="flex items-center gap-2">
            <div className={`w-8 h-8 ${theme.colors.primary} rounded flex items-center justify-center text-white font-bold text-lg`}>
                A
            </div>
            <div>
                <h1 className="font-bold text-lg leading-none">Abdullah Hashmi</h1>
                <span className={`text-[10px] ${theme.colors.muted} uppercase tracking-wider`}>Developer Portfolio</span>
            </div>
        </div>
        
        <div className="relative">
            <button 
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={`p-2 rounded-full ${theme.colors.secondary} ${theme.colors.accent} hover:opacity-80 transition-opacity`}
            >
                <Palette size={20} />
            </button>
            
            {showThemeMenu && (
                <div className={`absolute right-0 mt-3 w-40 ${theme.colors.surface} border ${theme.colors.border} rounded-lg shadow-xl overflow-hidden py-1`}>
                    {Object.values(THEMES).map((t) => (
                        <button
                            key={t.id}
                            onClick={() => {
                                setActiveTheme(t.id);
                                setShowThemeMenu(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:${theme.colors.secondary} ${activeTheme === t.id ? theme.colors.accent : theme.colors.text}`}
                        >
                            <div className={`w-3 h-3 rounded-full ${t.colors.primary}`}></div>
                            {t.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="pt-20 pb-24 px-4 max-w-3xl mx-auto min-h-screen">
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
            <div className="space-y-8 animate-fade-in">
                <div className={`p-6 ${theme.colors.surface} ${theme.colors.border} border ${theme.radius} shadow-lg text-center space-y-4`}>
                    <div className={`w-24 h-24 mx-auto ${theme.colors.secondary} rounded-full flex items-center justify-center mb-4 ring-4 ${theme.colors.border}`}>
                        <Code2 size={40} className={theme.colors.accent} />
                    </div>
                    <h2 className="text-3xl font-bold">Hello, I'm Hashmer</h2>
                    <TypeWriter 
                        text="Web Developer | AI Integrator | Next.js Specialist" 
                        className={`text-sm ${theme.colors.muted} font-mono`}
                    />
                    <div className="flex justify-center gap-4 mt-4">
                        {SOCIALS.map((social) => (
                            <a 
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className={`p-2 rounded-full ${theme.colors.secondary} hover:${theme.colors.primary} hover:text-white transition-all`}
                                title={social.platform}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className={`text-xl font-bold ${theme.colors.accent} uppercase tracking-widest text-xs mb-4`}>Quick Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 ${theme.colors.surface} ${theme.colors.border} border ${theme.radius} text-center`}>
                            <div className="text-3xl font-bold mb-1">3+</div>
                            <div className={`text-xs ${theme.colors.muted}`}>Major Projects</div>
                        </div>
                        <div className={`p-4 ${theme.colors.surface} ${theme.colors.border} border ${theme.radius} text-center`}>
                            <div className="text-3xl font-bold mb-1">4+</div>
                            <div className={`text-xs ${theme.colors.muted}`}>Years Coding</div>
                        </div>
                    </div>
                </div>

                 <div className={`p-6 ${theme.colors.secondary} ${theme.radius} border ${theme.colors.border}`}>
                    <h3 className="font-bold mb-2">Featured Skill: API Integration</h3>
                    <p className={`text-sm ${theme.colors.muted} mb-4`}>
                        This portfolio itself is a demonstration of my skills. Check out the "Lab" tab to see real-time Battery, Location, and Weather data integration.
                    </p>
                    <button 
                        onClick={() => setActiveTab('api')}
                        className={`text-xs ${theme.colors.primary} text-white px-4 py-2 rounded shadow-md hover:opacity-90`}
                    >
                        Go to Lab
                    </button>
                 </div>
            </div>
        )}

        {/* JOURNEY TAB */}
        {activeTab === 'journey' && (
            <div className="space-y-6 animate-fade-in">
                 <h2 className="text-2xl font-bold mb-6">My Journey</h2>
                 
                 <div className={`p-6 ${theme.colors.surface} ${theme.radius} border ${theme.colors.border} shadow-sm`}>
                    <p className="whitespace-pre-line leading-relaxed text-sm md:text-base">
                        {BIO_LONG}
                    </p>
                 </div>

                 <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${theme.colors.primary}`}></div>
                            <div className={`w-0.5 flex-1 ${theme.colors.border} bg-current opacity-30`}></div>
                        </div>
                        <div className="pb-8">
                            <span className={`text-xs font-bold ${theme.colors.accent}`}>2020</span>
                            <h4 className="font-bold">The Beginning</h4>
                            <p className={`text-sm ${theme.colors.muted} mt-1`}>Started learning HTML/CSS during COVID-19 lockdown while studying at Darearqam School.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${theme.colors.primary}`}></div>
                            <div className={`w-0.5 flex-1 ${theme.colors.border} bg-current opacity-30`}></div>
                        </div>
                        <div className="pb-8">
                            <span className={`text-xs font-bold ${theme.colors.accent}`}>2021-2022</span>
                            <h4 className="font-bold">Logic & JavaScript</h4>
                            <p className={`text-sm ${theme.colors.muted} mt-1`}>Dived into JS, logic building, and basic interactivity. Built the Quiz Game.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${theme.colors.primary}`}></div>
                        </div>
                        <div>
                            <span className={`text-xs font-bold ${theme.colors.accent}`}>Present</span>
                            <h4 className="font-bold">Full Stack & AI</h4>
                            <p className={`text-sm ${theme.colors.muted} mt-1`}>Mastering Next.js, Tailwind, and integrating AI models like Gemini into production apps.</p>
                        </div>
                    </div>
                 </div>
            </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">My Work</h2>
                <div className="grid gap-6">
                    {PROJECTS.map((project, index) => (
                        <div 
                            key={index}
                            className={`${theme.colors.surface} ${theme.colors.border} border ${theme.radius} overflow-hidden hover:shadow-lg transition-all duration-300 group`}
                        >
                            <div className={`p-6 space-y-4`}>
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 ${theme.colors.secondary} rounded-lg`}>
                                        <project.icon className={theme.colors.accent} size={24} />
                                    </div>
                                    <a 
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`text-xs flex items-center gap-1 ${theme.colors.muted} hover:${theme.colors.accent}`}
                                    >
                                        Visit <ExternalLink size={12} />
                                    </a>
                                </div>
                                
                                <div>
                                    <h3 className="font-bold text-lg">{project.title}</h3>
                                    <p className={`text-sm ${theme.colors.muted} mt-2 line-clamp-3`}>{project.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className={`text-[10px] px-2 py-1 rounded-full border ${theme.colors.border} ${theme.colors.bg}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* API LAB TAB */}
        {activeTab === 'api' && (
            <div className="animate-fade-in">
                 <ApiShowcase theme={theme} />
            </div>
        )}

        {/* CHAT TAB */}
        {activeTab === 'chat' && (
            <div className="animate-fade-in flex flex-col items-center justify-center h-full">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">AI Assistant</h2>
                    <p className={`text-sm ${theme.colors.muted}`}>Ask me about Abdullah's work</p>
                </div>
                <ChatBot theme={theme} />
            </div>
        )}

      </main>

      {/* Bottom Navigation Bar */}
      <div className={`fixed bottom-0 left-0 right-0 h-20 ${theme.colors.surface} border-t ${theme.colors.border} flex items-center px-2 pb-2 z-50`}>
        <div className="flex w-full max-w-lg mx-auto justify-between">
            <NavButton tab="home" icon={Home} label="Home" />
            <NavButton tab="journey" icon={User} label="Journey" />
            <NavButton tab="projects" icon={Briefcase} label="Work" />
            <NavButton tab="api" icon={Cpu} label="Lab" />
            <NavButton tab="chat" icon={MessageSquare} label="AI Chat" />
        </div>
      </div>

    </div>
  );
};

export default App;
