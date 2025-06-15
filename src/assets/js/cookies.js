document.addEventListener("DOMContentLoaded", async function () {
    const clearButton = document.getElementById('clearPreferencesBtn');
    if (clearButton) {
        clearButton.addEventListener('click', function () {
            clearUserData();
        });
    }
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
                    transition: "slide",
                    inlineStyles: false // 关键点：禁用内联样式
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
                            description: `${translations.en.message} <a href="../pages/privacy.html" target="_blank" class="cc-link">${translations.en.privacyPolicy}</a>`,
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
                                // {
                                //     title: "Performance and Analytics",
                                //     description: translations.en.cookiePolicy.analytics.description,
                                //     linkedCategory: 'analytics'
                                // },
                                {
                                    title: "More information",
                                    description: `For any queries in relation to our policy on cookies and your choices, please <a href="../pages/contact.html" class="cc-link">contact us</a>`
                                }
                            ]
                        }
                    },
                    de: {
                        consentModal: {
                            title: translations.de.title,
                            description: `${translations.de.message} <a href="../pages/privacy.html" target="_blank" class="cc-link">${translations.de.privacyPolicy}</a>`,
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
                                // {
                                //     title: "Leistungs- und Analyse-Cookies",
                                //     description: translations.de.cookiePolicy.analytics.description,
                                //     linkedCategory: 'analytics'
                                // },
                                {
                                    title: "Weitere Informationen",
                                    description: `Für Fragen zu unserer Cookie-Richtlinie oder Ihre Einstellungen wenden Sie sich bitte per <a href=\"mailto:contact@company.com\" class="cc-link">E-Mail</a>.`
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
                // ,analytics: {
                //     enabled: false,
                //     services: {
                //         google_analytics: {
                //             label: "Google Analytics",
                //             description: translations[lang].cookiePolicy.analytics.description,
                //             cookies: [/(_ga)/]
                //         }
                //     }
                // }
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

function clearUserData() {
    // 清除 localStorage
    localStorage.removeItem('lang');

    // 清除 cookies（示例：清除 CookieConsent 的 cookie）
    const paths = ["path=/", "path=/pages/", "path=/components/", "path=/assets/"];
        paths.forEach(p => {
            document.cookie = `cc_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ${p}; Secure; SameSite=Strict`;
        });
    
    // 如果 CookieConsent 实例存在，重置其状态
    if (typeof CookieConsent !== 'undefined') {
        CookieConsent.reset();
    }

    alert("Cookies and preferences have been cleared. Please refresh the page.");
}