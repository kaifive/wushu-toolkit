import React, { createContext, useContext, useEffect, useState } from 'react'

import { getData } from "../utils/getData"

export const Adults2025Context = createContext(null)

export const useAdults2025 = () => useContext(Adults2025Context)

const temp = {
    "MALES": {
        "CQ_DS_GS": {
            "Burns Seth": {
                "competitor": {
                    "name": "Burns Seth"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Daoshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Gunshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan"
                    }
                ]
            },
            "Chao Nathan": {
                "competitor": {
                    "name": "Chao Nathan"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Daoshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Gunshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan"
                    }
                ]
            },
            "Gao Bryan": {
                "competitor": {
                    "name": "Gao Bryan"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Daoshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Gunshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan"
                    }
                ]
            },
            "Sahertian Paul": {
                "competitor": {
                    "name": "Sahertian Paul"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Daoshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Gunshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan"
                    }
                ]
            },
            "Sun Nicholas": {
                "competitor": {
                    "name": "Sun Nicholas"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Daoshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Gunshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan"
                    }
                ]
            },
            "Wang Tony": {
                "competitor": {
                    "name": "Wang Tony"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Daoshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Gunshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan"
                    }
                ]
            },
            "Lu Dazhi": {
                "competitor": {
                    "name": "Lu Dazhi"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Daoshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Gunshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan"
                    }
                ]
            },
            "Yim Ashton": {
                "competitor": {
                    "name": "Yim Ashton"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Daoshu",
                        "nandu": [
                            "353B+323C+1",
                            "324C+6",
                            "355B"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Gunshu",
                        "nandu": [
                            "353B+323C+1",
                            "324C+6",
                            "355B"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan",
                        "nandu": [
                            "353B+323C+1",
                            "324C+6",
                            "355B"
                        ]
                    }
                ]
            },
            "Emmert Alex": {
                "competitor": {
                    "name": "Emmert Alex"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Daoshu",
                        "nandu": [
                            "324B+1",
                            "312A+335A",
                            "323A+1",
                            "324A+1",
                            "335A",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Gunshu",
                        "nandu": [
                            "324B+1",
                            "312A+335A",
                            "323A+1",
                            "324A+1",
                            "335A",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan",
                        "nandu": [
                            "312A+324B+1",
                            "312A+335A",
                            "323A+1",
                            "335A",
                            "333A+6"
                        ]
                    }
                ]
            },
            "Liu Shangshang": {
                "competitor": {
                    "name": "Liu Shangshang"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Daoshu",
                        "nandu": [
                            "312A+324A+6",
                            "312A+335A",
                            "323A+1",
                            "312A+6",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Gunshu",
                        "nandu": [
                            "312A+324A+6",
                            "312A+335A",
                            "323A+1",
                            "312A+6",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan",
                        "nandu": [
                            "312A+324A+6",
                            "312A+335A",
                            "323A+1",
                            "312A+6",
                            "333A+6"
                        ]
                    }
                ]
            },
            "Zheng Nathan": {
                "competitor": {
                    "name": "Zheng Nathan"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Daoshu",
                        "nandu": [
                            "324A+6",
                            "312A+335A",
                            "323A+1",
                            "324A+1",
                            "312A+6",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Gunshu",
                        "nandu": [
                            "324A+6",
                            "312A+335A",
                            "323A+1",
                            "324A+1",
                            "312A+6",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan",
                        "nandu": [
                            "324A+6",
                            "312A+335A",
                            "323A+1",
                            "324A+1",
                            "312A+6",
                            "333A+6"
                        ]
                    }
                ]
            }
        },
        "CQ_JS_QS": {
            "Tran Ryan": {
                "competitor": {
                    "name": "Tran Ryan"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Qiangshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Jianshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan"
                    }
                ]
            },
            "Wang Benjamin": {
                "competitor": {
                    "name": "Wang Benjamin"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Qiangshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Jianshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan"
                    }
                ]
            },
            "Yeager Blake": {
                "competitor": {
                    "name": "Yeager Blake"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Qiangshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Jianshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan"
                    }
                ]
            },
            "Zhang Alex": {
                "competitor": {
                    "name": "Zhang Alex"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Qiangshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Jianshu"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Changquan"
                    }
                ]
            }
        },
        "NQ_ND_NG": {
            "Burns Seth": {
                "competitor": {
                    "name": "Burns Seth"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Nangun"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Nandao"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Nanquan"
                    }
                ]
            },
            "Chao Nathan": {
                "competitor": {
                    "name": "Chao Nathan"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Nangun"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Nandao"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Nanquan"
                    }
                ]
            },
            "Nguyen Khai": {
                "competitor": {
                    "name": "Nguyen Khai"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Nanquan"
                    }
                ]
            },
            "Yim Augustin": {
                "competitor": {
                    "name": "Yim Augustin"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Nandao",
                        "nandu": [
                            "324B+1",
                            "323B+1",
                            "324A+1",
                            "323A+2",
                            "423A",
                            "447A+2"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Nangun",
                        "nandu": [
                            "324B+1",
                            "323B+1",
                            "324A+1",
                            "323A+2",
                            "423A",
                            "447A+2"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Nanquan",
                        "nandu": [
                            "324B+1",
                            "323B+1",
                            "324A+1",
                            "323A+2",
                            "423A",
                            "447A+2"
                        ]
                    }
                ]
            }
        },
        "TQ_TJ_TS": {
            "Huang Victor": {
                "competitor": {
                    "name": "Huang Victor"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Taijiquan"
                    }
                ]
            },
            "Wong Kadyn": {
                "competitor": {
                    "name": "Wong Kadyn"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Men´s Taijijian"
                    },
                    {
                        "event": "Taolu Team Trials - Men´s Taijiquan"
                    }
                ]
            }
        }
    },
    "FEMALES": {
        "CQ_DS_GS": {
            "Chand Tara": {
                "competitor": {
                    "name": "Chand Tara"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Women´s Daoshu"
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Gunshu"
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Changquan"
                    }
                ]
            },
            "Chew Allison": {
                "competitor": {
                    "name": "Chew Allison"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Women´s Daoshu"
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Gunshu"
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Changquan"
                    }
                ]
            },
            "Hung Charisse": {
                "competitor": {
                    "name": "Hung Charisse"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Women´s Daoshu"
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Gunshu"
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Changquan"
                    }
                ]
            },
            "Tran Audrey": {
                "competitor": {
                    "name": "Tran Audrey"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Women´s Daoshu"
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Gunshu"
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Changquan"
                    }
                ]
            },
            "Nguyen Chloe": {
                "competitor": {
                    "name": "Nguyen Chloe"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Women´s Daoshu",
                        "nandu": [
                            "312A+6",
                            "324A+1",
                            "312A+335A",
                            "323A+4",
                            "324A+6",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Gunshu",
                        "nandu": [
                            "324A+7",
                            "312A+6",
                            "312A+335A",
                            "323A+4",
                            "324A+6",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Changquan",
                        "nandu": [
                            "324A+1",
                            "312A+6",
                            "312A+335A",
                            "323A+4",
                            "324A+6",
                            "333A+6"
                        ]
                    }
                ]
            },
            "Shen Joy": {
                "competitor": {
                    "name": "Shen Joy"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Women´s Daoshu",
                        "nandu": [
                            "323A+1",
                            "324A+1",
                            "312A+335A",
                            "323A+6",
                            "312A+6",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Gunshu",
                        "nandu": [
                            "323A+1",
                            "324A+1",
                            "312A+335A",
                            "323A+6",
                            "312A+6",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Changquan",
                        "nandu": [
                            "323A+1",
                            "324A+1",
                            "312A+335A",
                            "323A+6",
                            "312A+6",
                            "333A+6"
                        ]
                    }
                ]
            }
        },
        "CQ_JS_QS": {
            "Schmidt Dusty": {
                "competitor": {
                    "name": "Schmidt Dusty"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Women´s Jianshu",
                        "nandu": [
                            "324A+1",
                            "353B+323B+6",
                            "312A+6",
                            "335A",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Qiangshu",
                        "nandu": [
                            "324A+1",
                            "353B+323B+6",
                            "312A+6",
                            "335A",
                            "333A+6"
                        ]
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Changquan",
                        "nandu": [
                            "312A+6",
                            "353B+323B+6",
                            "324A+1",
                            "335A",
                            "333A+6"
                        ]
                    }
                ]
            }
        },
        "NQ_ND_NG": {
            "Yuen Leianna": {
                "competitor": {
                    "name": "Yuen Leianna"
                },
                "events": [
                    {
                        "event": "Taolu Team Trials - Women´s Nanquan"
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Nandao"
                    },
                    {
                        "event": "Taolu Team Trials - Women´s Nangun"
                    }
                ]
            }
        },
        "TQ_TJ_TS": {}
    }
}

export const Adults2025Provider = ({ children }) => {
    const [filters, setFilters] = useState({
        categoryFilter: "",
    });

    const [data, setData] = useState({
        athleteData: null,
        date: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
        isLoading: true,
        error: null,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const athleteData = await getData();

                //const athleteData = temp;

                setData({
                    athleteData,
                    date: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
                    isLoading: false,
                    error: null
                })
            } catch (error) {
                setData({
                    athleteData: null,
                    date: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
                    loading: false,
                    error,
                })
            }
        }

        fetchData()
    }, []);

    return (
        <Adults2025Context.Provider value={{ data, filters, setFilters}}>
            {children}
        </Adults2025Context.Provider>
    )
}
