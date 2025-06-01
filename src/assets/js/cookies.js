// document.addEventListener("DOMContentLoaded", function () {
//     // Wait until cookieconsent library is ready
//     const checkCookieConsentReady = setInterval(() => {
//         if (typeof CookieConsent !== "undefined") {
//             clearInterval(checkCookieConsentReady);
//             initCookieConsent();
//         }
//     }, 100);

//     function initCookieConsent() {
//         const lang = localStorage.getItem('lang') || 'en';
//         const translations = {
//             en: {
//                 title: "We use cookies",
//                 message: "We use cookies to ensure you get the best experience.",
//                 acceptAllBtn: "Accept All",
//                 acceptNecessaryBtn: "Reject All",
//                 showPreferencesBtn: "Manage Preferences",
//                 savePreferencesBtn: "Save Settings",
//                 privacyPolicy: "Privacy Policy",
//                 closeBtnLabel: "Close",
//                 cookiePolicy: {
//                     necessary: {
//                         label: "Necessary Cookies",
//                         description: "Essential for the website to function properly."
//                     },
//                     analytics: {
//                         label: "Analytics Cookies",
//                         description: "Help us improve our website by collecting anonymous data."
//                     }
//                 }
//             },
//             de: {
//                 title: "Wir verwenden Cookies",
//                 message: "Wir verwenden Cookies für ein optimales Erlebnis.",
//                 acceptAllBtn: "Alle akzeptieren",
//                 acceptNecessaryBtn: "Alle ablehnen",
//                 showPreferencesBtn: "Einstellungen verwalten",
//                 savePreferencesBtn: "Einstellungen speichern",
//                 privacyPolicy: "Datenschutz",
//                 closeBtnLabel: "Schließen",
//                 cookiePolicy: {
//                     necessary: {
//                         label: "Notwendige Cookies",
//                         description: "Unverzichtbar für die Funktionalität der Website."
//                     },
//                     analytics: {
//                         label: "Analyse-Cookies",
//                         description: "Helfen uns, unsere Website zu verbessern."
//                     }
//                 }
//             }
//         };

//         CookieConsent.run({
//             guiOptions: {
//                 consentModal: {
//                     layout: "box",
//                     position: "bottom right",
//                     transition: "slide"
//                 },
//                 preferencesModal: {
//                     layout: "bar",
//                     position: "right",
//                     flipButtons: false
//                 }
//             },
//             language: {
//                 default: lang,
//                 autoDetect: "browser",
//                 translations: {
//                     en: {
//                         consentModal: {
//                             title: translations.en.title,
//                             description: translations.en.message,
//                             acceptAllBtn: translations.en.acceptAllBtn,
//                             acceptNecessaryBtn: translations.en.acceptNecessaryBtn,
//                             showPreferencesBtn: translations.en.showPreferencesBtn
//                         },
//                         preferencesModal: {
//                             title: "Cookie Preferences",
//                             acceptAllBtn: translations.en.acceptAllBtn,
//                             acceptNecessaryBtn: translations.en.acceptNecessaryBtn,
//                             savePreferencesBtn: translations.en.savePreferencesBtn
//                         }
//                     },
//                     de: {
//                         consentModal: {
//                             title: translations.de.title,
//                             description: translations.de.message,
//                             acceptAllBtn: translations.de.acceptAllBtn,
//                             acceptNecessaryBtn: translations.de.acceptNecessaryBtn,
//                             showPreferencesBtn: translations.de.showPreferencesBtn
//                         },
//                         preferencesModal: {
//                             title: "Cookie-Einstellungen",
//                             acceptAllBtn: translations.de.acceptAllBtn,
//                             acceptNecessaryBtn: translations.de.acceptNecessaryBtn,
//                             savePreferencesBtn: translations.de.savePreferencesBtn
//                         }
//                     }
//                 }
//             },
//             categories: {
//                 necessary: {
//                     readOnly: true,
//                     enabled: true,
//                     services: {
//                         essential: {
//                             label: translations[lang].cookiePolicy.necessary.label,
//                             description: translations[lang].cookiePolicy.necessary.description
//                         }
//                     }
//                 },
//                 analytics: {
//                     enabled: false,
//                     services: {
//                         google_analytics: {
//                             label: "Google Analytics",
//                             description: translations[lang].cookiePolicy.analytics.description,
//                             cookies: [/(_ga)/]
//                         }
//                     }
//                 }
//             },
//             onFirstConsent: ({ cookie }) => {
//                 console.log("First consent set:", cookie);
//             },
//             onConsent: ({ cookie }) => {
//                 console.log("Consent updated:", cookie);
//             },
//             onChange: ({ changedCategories }) => {
//                 console.log("Changed categories:", changedCategories);
//             },
//             onModalShow: ({ modalName }) => {
//                 console.log(`Modal "${modalName}" shown`);
//             },
//             onModalReady: ({ modal }) => {
//                 console.log("Modal DOM ready");
//             },
//             onModalHide: () => {
//                 console.log("Modal hidden");
//             }
//         });

//         // Watch for language changes from main.js
//         window.addEventListener('languageChanged', function (e) {
//             const newLang = e.detail.lang;
//             CookieConsent.setLanguage(newLang);
//         });
//     }
// });

////////////////////////////////////////////////////////////////////
// document.addEventListener("DOMContentLoaded", function () {
//     let currentTranslations = null;
//     const lang = localStorage.getItem('lang') || 'en';

//     // 封装翻译加载逻辑
//     async function loadTranslations(lang) {
//         try {
//             const response = await fetch(`../assets/i18n/${lang}.json`);
//             return await response.json();
//         } catch (e) {
//             console.error('Failed to load translation for cookie consent:', e);
//             return null;
//         }
//     }

//     // 等待库就绪后初始化
//     const checkReady = setInterval(() => {
//         if (typeof CookieConsent !== "undefined") {
//             clearInterval(checkReady);
//             initCookieConsent(lang);
//         }
//     }, 100);

//     async function initCookieConsent(initialLang) {
//         const translations = await loadTranslations(initialLang);
//         if (!translations) return;

//         currentTranslations = {
//             en: {
//                 title: translations.cookie_message,
//                 message: translations.cookie_learn_more,
//                 acceptAllBtn: translations.cookie_accept,
//                 acceptNecessaryBtn: translations.cookie_decline,
//                 showPreferencesBtn: translations.cookie_manage_preferences,
//                 savePreferencesBtn: translations.savePreferencesBtn,
//                 privacyPolicy: translations.privacy,
//                 closeBtnLabel: translations.closeBtnLabel,
//                 cookiePolicy: {
//                     necessary: {
//                         label: translations.cookie_policy_necessary_label,
//                         description: translations.cookie_policy_necessary_description
//                     },
//                     analytics: {
//                         label: "Analytics Cookies",
//                         description: translations.cookie_policy_analytics_description
//                     }
//                 }
//             },
//             de: {
//                 title: translations.cookie_message,
//                 message: translations.cookie_learn_more,
//                 acceptAllBtn: translations.cookie_accept,
//                 acceptNecessaryBtn: translations.cookie_decline,
//                 showPreferencesBtn: translations.cookie_manage_preferences,
//                 savePreferencesBtn: translations.savePreferencesBtn,
//                 privacyPolicy: translations.privacy,
//                 closeBtnLabel: translations.closeBtnLabel,
//                 cookiePolicy: {
//                     necessary: {
//                         label: translations.cookie_policy_necessary_label,
//                         description: translations.cookie_policy_necessary_description
//                     },
//                     analytics: {
//                         label: "Analyse-Cookies",
//                         description: translations.cookie_policy_analytics_description
//                     }
//                 }
//             }
//         };

//         CookieConsent.run({
//             guiOptions: {
//                 consentModal: {
//                     layout: "box",
//                     position: "bottom right",
//                     transition: "slide"
//                 },
//                 preferencesModal: {
//                     layout: "bar",
//                     position: "right",
//                     flipButtons: false
//                 }
//             },
//             language: {
//                 default: initialLang,
//                 autoDetect: "browser",
//                 translations: {
//                     en: {
//                         consentModal: {
//                             title: currentTranslations.en.title,
//                             description: currentTranslations.en.message + ' <a href="../pages/privacy.html" target="_blank" style="color:#007bff; text-decoration:underline;">privacy policy</a>',
//                             acceptAllBtn: currentTranslations.en.acceptAllBtn,
//                             acceptNecessaryBtn: currentTranslations.en.acceptNecessaryBtn,
//                             showPreferencesBtn: currentTranslations.en.showPreferencesBtn
//                         },
//                         preferencesModal: {
//                             title: "Cookie Preferences",
//                             acceptAllBtn: currentTranslations.en.acceptAllBtn,
//                             acceptNecessaryBtn: currentTranslations.en.acceptNecessaryBtn,
//                             savePreferencesBtn: currentTranslations.en.savePreferencesBtn
//                         }
//                     },
//                     de: {
//                         consentModal: {
//                             title: currentTranslations.de.title,
//                             description: currentTranslations.de.message + ' <a href="../pages/privacy.html" target="_blank" style="color:#007bff; text-decoration:underline;">datenschutz</a>',
//                             acceptAllBtn: currentTranslations.de.acceptAllBtn,
//                             acceptNecessaryBtn: currentTranslations.de.acceptNecessaryBtn,
//                             showPreferencesBtn: currentTranslations.de.showPreferencesBtn
//                         },
//                         preferencesModal: {
//                             title: "Cookie-Einstellungen",
//                             acceptAllBtn: currentTranslations.de.acceptAllBtn,
//                             acceptNecessaryBtn: currentTranslations.de.acceptNecessaryBtn,
//                             savePreferencesBtn: currentTranslations.de.savePreferencesBtn
//                         }
//                     }
//                 }
//             },
//             categories: {
//                 necessary: {
//                     readOnly: true,
//                     enabled: true,
//                     services: {
//                         essential: {
//                             label: currentTranslations[initialLang].cookiePolicy.necessary.label,
//                             description: currentTranslations[initialLang].cookiePolicy.necessary.description
//                         }
//                     }
//                 },
//                 analytics: {
//                     enabled: false,
//                     services: {
//                         google_analytics: {
//                             label: "Google Analytics",
//                             description: currentTranslations[initialLang].cookiePolicy.analytics.description,
//                             cookies: [/(_ga)/]
//                         }
//                     }
//                 }
//             },

//         });
        
//     }

//     // 监听语言变化
//     window.addEventListener('languageChanged', async function (e) {
//         const newLang = e.detail.lang;

//         const newTranslations = await loadTranslations(newLang);
//         if (!newTranslations) return;

//         // 更新 translations 对象
//         currentTranslations = {
//             en: {
//                 title: newTranslations.cookie_message,
//                 message: newTranslations.cookie_learn_more,
//                 acceptAllBtn: newTranslations.cookie_accept,
//                 acceptNecessaryBtn: newTranslations.cookie_decline,
//                 showPreferencesBtn: newTranslations.cookie_manage_preferences,
//                 savePreferencesBtn: newTranslations.savePreferencesBtn,
//                 privacyPolicy: newTranslations.privacy,
//                 closeBtnLabel: newTranslations.closeBtnLabel,
//                 cookiePolicy: {
//                     necessary: {
//                         label: newTranslations.cookie_policy_necessary_label,
//                         description: newTranslations.cookie_policy_necessary_description
//                     },
//                     analytics: {
//                         label: "Analytics Cookies",
//                         description: newTranslations.cookie_policy_analytics_description
//                     }
//                 }
//             },
//             de: {
//                 title: newTranslations.cookie_message,
//                 message: newTranslations.cookie_learn_more,
//                 acceptAllBtn: newTranslations.cookie_accept,
//                 acceptNecessaryBtn: newTranslations.cookie_decline,
//                 showPreferencesBtn: newTranslations.cookie_manage_preferences,
//                 savePreferencesBtn: newTranslations.savePreferencesBtn,
//                 privacyPolicy: newTranslations.privacy,
//                 closeBtnLabel: newTranslations.closeBtnLabel,
//                 cookiePolicy: {
//                     necessary: {
//                         label: newTranslations.cookie_policy_necessary_label,
//                         description: newTranslations.cookie_policy_necessary_description
//                     },
//                     analytics: {
//                         label: "Analyse-Cookies",
//                         description: newTranslations.cookie_policy_analytics_description
//                     }
//                 }
//             }
//         };

//         // 更新 CookieConsent 实例的翻译内容
//         CookieConsent.updateConfig({
//             language: {
//                 default: newLang,
//                 translations: {
//                     en: {
//                         consentModal: {
//                             title: currentTranslations.en.title,
//                             description: currentTranslations.en.message,
//                             acceptAllBtn: currentTranslations.en.acceptAllBtn,
//                             acceptNecessaryBtn: currentTranslations.en.acceptNecessaryBtn,
//                             showPreferencesBtn: currentTranslations.en.showPreferencesBtn
//                         },
//                         preferencesModal: {
//                             title: "Cookie Preferences",
//                             acceptAllBtn: currentTranslations.en.acceptAllBtn,
//                             acceptNecessaryBtn: currentTranslations.en.acceptNecessaryBtn,
//                             savePreferencesBtn: currentTranslations.en.savePreferencesBtn
//                         }
//                     },
//                     de: {
//                         consentModal: {
//                             title: currentTranslations.de.title,
//                             description: currentTranslations.de.message,
//                             acceptAllBtn: currentTranslations.de.acceptAllBtn,
//                             acceptNecessaryBtn: currentTranslations.de.acceptNecessaryBtn,
//                             showPreferencesBtn: currentTranslations.de.showPreferencesBtn
//                         },
//                         preferencesModal: {
//                             title: "Cookie-Einstellungen",
//                             acceptAllBtn: currentTranslations.de.acceptAllBtn,
//                             acceptNecessaryBtn: currentTranslations.de.acceptNecessaryBtn,
//                             savePreferencesBtn: currentTranslations.de.savePreferencesBtn
//                         }
//                     }
//                 }
//             },
//             categories: {
//                 necessary: {
//                     services: {
//                         essential: {
//                             label: currentTranslations[newLang].cookiePolicy.necessary.label,
//                             description: currentTranslations[newLang].cookiePolicy.necessary.description
//                         }
//                     }
//                 },
//                 analytics: {
//                     services: {
//                         google_analytics: {
//                             description: currentTranslations[newLang].cookiePolicy.analytics.description
//                         }
//                     }
//                 }
//             }
//         });

//         CookieConsent.setLanguage(newLang);
//     });
// });


document.addEventListener("DOMContentLoaded", async function () {
    let allTranslations = {}; // 存储所有语言的翻译
    const lang = localStorage.getItem('lang') || 'en';

    // 封装翻译加载逻辑（一次性加载所有语言）
    async function loadAllTranslations() {
        try {
            const [en, de] = await Promise.all([
                fetch('../assets/i18n/en.json').then(res => res.json()),
                fetch('../assets/i18n/de.json').then(res => res.json())
            ]);
            allTranslations = { en, de };
        } catch (e) {
            console.error('Failed to load translations:', e);
        }
    }

    // 等待库就绪后初始化
    const checkReady = setInterval(() => {
        if (typeof CookieConsent !== "undefined") {
            clearInterval(checkReady);
            initCookieConsent(lang);
        }
    }, 100);

    async function initCookieConsent(initialLang) {
        await loadAllTranslations(); // 确保中英文都已加载

        // 构建完整的 translations 对象
        const currentTranslations = {
            en: {
                title: allTranslations.en.cookie_message,
                message: allTranslations.en.cookie_learn_more,
                acceptAllBtn: allTranslations.en.cookie_accept,
                acceptNecessaryBtn: allTranslations.en.cookie_decline,
                showPreferencesBtn: allTranslations.en.cookie_manage_preferences,
                savePreferencesBtn: allTranslations.en.savePreferencesBtn,
                privacyPolicy: allTranslations.en.privacy,
                closeBtnLabel: allTranslations.en.closeBtnLabel,
                cookiePolicy: {
                    necessary: {
                        label: allTranslations.en.cookie_policy_necessary_label,
                        description: allTranslations.en.cookie_policy_necessary_description
                    },
                    analytics: {
                        label: "Analytics Cookies",
                        description: allTranslations.en.cookie_policy_analytics_description
                    }
                }
            },
            de: {
                title: allTranslations.de.cookie_message,
                message: allTranslations.de.cookie_learn_more,
                acceptAllBtn: allTranslations.de.cookie_accept,
                acceptNecessaryBtn: allTranslations.de.cookie_decline,
                showPreferencesBtn: allTranslations.de.cookie_manage_preferences,
                savePreferencesBtn: allTranslations.de.savePreferencesBtn,
                privacyPolicy: allTranslations.de.privacy,
                closeBtnLabel: allTranslations.de.closeBtnLabel,
                cookiePolicy: {
                    necessary: {
                        label: allTranslations.de.cookie_policy_necessary_label,
                        description: allTranslations.de.cookie_policy_necessary_description
                    },
                    analytics: {
                        label: "Analyse-Cookies",
                        description: allTranslations.de.cookie_policy_analytics_description
                    }
                }
            }
        };

        // 构造配置
        const config = buildConfig(currentTranslations, initialLang);

        // 初始化 CookieConsent
        CookieConsent.run(config);
    }

    // 构建 CookieConsent 配置
    function buildConfig(translations, lang) {
        return {
            guiOptions: {
                consentModal: {
                    layout: "box",
                    position: "bottom right",
                    transition: "slide"
                },
                preferencesModal: {
                    layout: "bar",
                    position: "right",
                    flipButtons: false
                }
            },
            language: {
                default: lang,
                autoDetect: "browser",
                translations: {
                    en: {
                        consentModal: {
                            title: translations.en.title,
                            description: `${translations.en.message} <a href="../pages/privacy.html" target="_blank" style="color:#007bff; text-decoration:underline;">${translations.en.privacyPolicy}</a>`,
                            acceptAllBtn: translations.en.acceptAllBtn,
                            acceptNecessaryBtn: translations.en.acceptNecessaryBtn,
                            showPreferencesBtn: translations.en.showPreferencesBtn
                        },
                        preferencesModal: {
                            title: "Cookie Preferences",
                            acceptAllBtn: translations.en.acceptAllBtn,
                            acceptNecessaryBtn: translations.en.acceptNecessaryBtn,
                            savePreferencesBtn: translations.en.savePreferencesBtn,
                            sections: [
                                {
                                    title: "Strictly Necessary cookies",
                                    description: translations.en.cookiePolicy.necessary.description,
                                    linkedCategory: 'necessary'
                                },
                                {
                                    title: "Performance and Analytics",
                                    description: translations.en.cookiePolicy.analytics.description,
                                    linkedCategory: 'analytics'
                                },
                                {
                                    title: "More information",
                                    description: `For any queries in relation to our policy on cookies and your choices, please <a href="../pages/contact.html" style="color:#007bff;">contact us</a>`
                                }
                            ]
                        }
                    },
                    de: {
                        consentModal: {
                            title: translations.de.title,
                            description: `${translations.de.message} <a href="../pages/privacy.html" target="_blank" style="color:#007bff; text-decoration:underline;">${translations.de.privacyPolicy}</a>`,
                            acceptAllBtn: translations.de.acceptAllBtn,
                            acceptNecessaryBtn: translations.de.acceptNecessaryBtn,
                            showPreferencesBtn: translations.de.showPreferencesBtn
                        },
                        preferencesModal: {
                            title: "Cookie-Einstellungen",
                            acceptAllBtn: translations.de.acceptAllBtn,
                            acceptNecessaryBtn: translations.de.acceptNecessaryBtn,
                            savePreferencesBtn: translations.de.savePreferencesBtn,
                            sections: [
                                {
                                    title: "Notwendige Cookies",
                                    description: translations.de.cookiePolicy.necessary.description,
                                    linkedCategory: 'necessary'
                                },
                                {
                                    title: "Leistungs- und Analyse-Cookies",
                                    description: translations.de.cookiePolicy.analytics.description,
                                    linkedCategory: 'analytics'
                                },
                                {
                                    title: "Weitere Informationen",
                                    description: `Für Fragen zu unserer Cookie-Richtlinie oder Ihre Einstellungen wenden Sie sich bitte per <a href=\"mailto:contact@company.com\" style="color:#007bff;">E-Mail</a>.`
                                }
                            ]
                        }
                    }
                }
            },
            categories: {
                necessary: {
                    readOnly: true,
                    enabled: true,
                    services: {
                        essential: {
                            label: translations[lang].cookiePolicy.necessary.label,
                            description: translations[lang].cookiePolicy.necessary.description
                        }
                    }
                },
                analytics: {
                    enabled: false,
                    services: {
                        google_analytics: {
                            label: "Google Analytics",
                            description: translations[lang].cookiePolicy.analytics.description,
                            cookies: [/(_ga)/]
                        }
                    }
                }
            },
            onFirstConsent: ({ cookie }) => {
                console.log("First consent set:", cookie);
            },
            onConsent: ({ cookie }) => {
                console.log("Consent updated:", cookie);
            },
            onChange: ({ changedCategories }) => {
                console.log("Changed categories:", changedCategories);
            },
            onModalShow: ({ modalName }) => {
                console.log(`Modal "${modalName}" shown`);
            },
            onModalReady: ({ modal }) => {
                console.log("Modal DOM ready");
            },
            onModalHide: () => {
                console.log("Modal hidden");
            }
        };
    }

    // 监听语言变化
    window.addEventListener('languageChanged', function (e) {
        const newLang = e.detail.lang;
        if (typeof CookieConsent !== 'undefined') {
            CookieConsent.setLanguage(newLang);
        }
    });
});