import type { EventCode } from "@/lib/domain/types";
import type { RuleSource } from "../types";

/**
 * Required movements for optional routines, migrated from the legacy app.
 * Pending a check against the IWUF 2024 Taolu rules (OPEN_QUESTIONS #2).
 */

export interface RequiredMovementSet {
  id: string;
  class: string;
  type: string;
  events: EventCode[];
  requirements: { title: string; items: string[] }[];
}

export const REQUIRED_MOVEMENTS_SOURCE: RuleSource = {
  title: "IWUF Wushu Taolu Competition Rules and Judging Methods: optional routine content requirements",
  revision: "pending verification (migrated from legacy app)",
  verified: false,
};

export const REQUIRED_MOVEMENTS: RequiredMovementSet[] = [
  {
    "id": "changquan",
    "class": "Optional Changquan, Daoshu, Jianshu, Qiangshu, Gunshu",
    "type": "Changquan",
    "events": [
      "CQ"
    ],
    "requirements": [
      {
        "title": "Three (3) hand shapes/forms comprising of Quán (Fist), Zhǎng (Palm), and Gōu Shǒu (Hook)",
        "items": [
          "Quán (Fist)",
          "Zhǎng (Palm)",
          "Gōu Shǒu (Hook)"
        ]
      },
      {
        "title": "Three (3) techniques employing a fist",
        "items": [
          "Fist #1",
          "Fist #2",
          "Fist #3"
        ]
      },
      {
        "title": "Two (2) techniques employing a palm",
        "items": [
          "Palm #1",
          "Palm #2"
        ]
      },
      {
        "title": "One (1) offensive elbow technique",
        "items": [
          "Offensive Elbow"
        ]
      },
      {
        "title": "Five (5) stances comprising of Gōng Bù (Bow Stance), Mǎ Bù (Horse Stance), Pū Bù (Crouching Stance), Xū Bù (Empty Stance), Xiē Bù (Cross-Legged Crouching Stance)",
        "items": [
          "Gōng Bù (Bow Stance)",
          "Mǎ Bù (Horse Stance)",
          "Pū Bù (Crouching Stance)",
          "Xū Bù (Empty Stance)",
          "Xiē Bù (Cross-Legged Crouching Stance)"
        ]
      },
      {
        "title": "Three (3) leg techniques comprising of leg swinging techniques/methods with the leg straight, flexion to extension, and sweep",
        "items": [
          "Leg Straight",
          "Flexion to Extension",
          "Sweep"
        ]
      },
      {
        "title": "One (1) extended balance technique",
        "items": [
          "Extended Balance"
        ]
      }
    ]
  },
  {
    "id": "jianshu",
    "class": "Optional Changquan, Daoshu, Jianshu, Qiangshu, Gunshu",
    "type": "Jianshu",
    "events": [
      "JS"
    ],
    "requirements": [
      {
        "title": "Eight (8) straight sword techniques comprising of Cì Jiàn (Straight Sword Thrust), Guà Jiàn (Straight Sword Hooking Parry), Liāo Jiàn (Straight Sword Uppercut), Diǎn Jiàn (Straight Sword Pointing), Pī Jiàn (Straight Sword Chop), Bēng Jiàn (Upward Sword Tilt), Jié Jiàn (Straight Sword Intercept), Jiǎn Wàn Huā (Straight Sword Figure '8')",
        "items": [
          "Cì Jiàn (Straight Sword Thrust)",
          "Guà Jiàn (Straight Sword Hooking Parry)",
          "Liāo Jiàn (Straight Sword Uppercut)",
          "Diǎn Jiàn (Straight Sword Pointing)",
          "Pī Jiàn (Straight Sword Chop)",
          "Bēng Jiàn (Upward Sword Tilt)",
          "Jié Jiàn (Straight Sword Intercept)",
          "Jiǎn Wàn Huā (Straight Sword Figure '8')"
        ]
      },
      {
        "title": "Five (5) stances comprising of Gōng Bù (Bow Stance), Pū Bù (Crouching Stance), Xū Bù (Empty Stance)",
        "items": [
          "Gōng Bù (Bow Stance)",
          "Mǎ Bù (Horse Stance)",
          "Pū Bù (Crouching Stance)",
          "Xū Bù (Empty Stance)",
          "Xiē Bù (Cross-Legged Crouching Stance)"
        ]
      },
      {
        "title": "One (1) extended balance technique",
        "items": [
          "Extended Balance"
        ]
      }
    ]
  },
  {
    "id": "daoshu",
    "class": "Optional Changquan, Daoshu, Jianshu, Qiangshu, Gunshu",
    "type": "Daoshu",
    "events": [
      "DS"
    ],
    "requirements": [
      {
        "title": "Eight (8) broadsword techniques comprising of Chán Tóu (Broadsword Twining), Guǒ Nǎo (Wrapping with the Broadsword), Pī Dāo (Broadsword Chop), Zhā Dāo (Broadsword Thrust), Zhǎn Dāo (Broadsword Hack), Guà Dāo (Broadsword Hooking Parry), Yún Dāo (Broadsword Cloud Waving), Bèi Huā Dāo (Broadsword Wrist Figure 8 Behind the Back)",
        "items": [
          "Chán Tóu (Broadsword Twining)",
          "Guǒ Nǎo (Wrapping with the Broadsword)",
          "Pī Dāo (Broadsword Chop)",
          "Zhā Dāo (Broadsword Thrust)",
          "Zhǎn Dāo (Broadsword Hack)",
          "Guà Dāo (Broadsword Hooking Parry)",
          "Yún Dāo (Broadsword Cloud Waving)",
          "Bèi Huā Dāo (Broadsword Wrist Figure 8 Behind the Back)"
        ]
      },
      {
        "title": "Five (5) stances comprising of Gōng Bù (Bow Stance), Mǎ Bù (Horse Stance), Pū Bù (Crouching Stance), Xū Bù (Empty Stance), Xiē Bù (Cross-Legged Crouching Stance)",
        "items": [
          "Gōng Bù (Bow Stance)",
          "Mǎ Bù (Horse Stance)",
          "Pū Bù (Crouching Stance)",
          "Xū Bù (Empty Stance)",
          "Xiē Bù (Cross-Legged Crouching Stance)"
        ]
      }
    ]
  },
  {
    "id": "qiangshu",
    "class": "Optional Changquan, Daoshu, Jianshu, Qiangshu, Gunshu",
    "type": "Qiangshu",
    "events": [
      "QS"
    ],
    "requirements": [
      {
        "title": "Eight (8) spear techniques comprising of Lán Qiāng (Outward Blocking with the Spear), Ná Qiāng (Inward Blocking with the Spear), Zhā Qiāng (Spear Thrust), Chuān Qiāng (Spear Piece), Bēng Qiāng (Spear Tilt), Diǎn Qiāng (Spear Pointing), Lì Wǔ Huā Qiāng (Vertical Figure '8' with the Spear), Tiāo Bǎ (Upwards Handle Strike)",
        "items": [
          "Lán Qiāng (Outward Blocking with the Spear)",
          "Ná Qiāng (Inward Blocking with the Spear)",
          "Zhā Qiāng (Spear Thrust)",
          "Chuān Qiāng (Spear Piece)",
          "Bēng Qiāng (Spear Tilt)",
          "Diǎn Qiāng (Spear Pointing)",
          "Lì Wǔ Huā Qiāng (Vertical Figure '8' with the Spear)",
          "Tiāo Bǎ (Upwards Handle Strike)"
        ]
      },
      {
        "title": "Five (5) stances comprising of Gōng Bù (Bow Stance), Mǎ Bù (Horse Stance), Pū Bù (Crouching Stance), Xū Bù (Empty Stance), Xiē Bù (Cross-Legged Crouching Stance)",
        "items": [
          "Gōng Bù (Bow Stance)",
          "Mǎ Bù (Horse Stance)",
          "Pū Bù (Crouching Stance)",
          "Xū Bù (Empty Stance)",
          "Xiē Bù (Cross-Legged Crouching Stance)"
        ]
      }
    ]
  },
  {
    "id": "gunshu",
    "class": "Optional Changquan, Daoshu, Jianshu, Qiangshu, Gunshu",
    "type": "Gunshu",
    "events": [
      "GS"
    ],
    "requirements": [
      {
        "title": "Eight (8) cudgel techniques comprising of Píng Lūn Gùn (Horizontal Cudgel Windmill Wave), Pī Gùn (Cudgel Chop), Yún Gùn (Cudgel Cloud Waving), Bēng Gùn (Cudgel Tilt), Jiǎo Gùn (Cudgel Enveloping), Chuō Gùn (Cudgel Poke), Lì Wǔ Huā Gùn (Vertical Figure 8 with the Cudgel), Shuāng Shǒu Tí Liāo Huā Gùn (Two-handed Vertical Cudgel Uppercut)",
        "items": [
          "Píng Lūn Gùn (Horizontal Cudgel Windmill Wave)",
          "Pī Gùn (Cudgel Chop)",
          "Yún Gùn (Cudgel Cloud Waving)",
          "Bēng Gùn (Cudgel Tilt)",
          "Jiǎo Gùn (Cudgel Enveloping)",
          "Chuō Gùn (Cudgel Poke)",
          "Lì Wǔ Huā Gùn (Vertical Figure 8 with the Cudgel)",
          "Shuāng Shǒu Tí Liāo Huā Gùn (Two-handed Vertical Cudgel Uppercut)"
        ]
      },
      {
        "title": "Five (5) stances comprising of Gōng Bù (Bow Stance), Mǎ Bù (Horse Stance), Pū Bù (Crouching Stance), Xū Bù (Empty Stance), Xiē Bù (Cross-Legged Crouching Stance)",
        "items": [
          "Gōng Bù (Bow Stance)",
          "Mǎ Bù (Horse Stance)",
          "Pū Bù (Crouching Stance)",
          "Xū Bù (Empty Stance)",
          "Xiē Bù (Cross-Legged Crouching Stance)"
        ]
      }
    ]
  },
  {
    "id": "nanquan",
    "class": "Optional Nanquan, Nandao, Nangun",
    "type": "Nanquan",
    "events": [
      "NQ"
    ],
    "requirements": [
      {
        "title": "One (1) hand shape/form of Hǔ Zhǎo (Tiger’s Claw)",
        "items": [
          "Hǔ Zhǎo (Tiger’s Claw)"
        ]
      },
      {
        "title": "Two (2) fist techniques comprising of Guà Gài Quán (Hanging & Covering Fist), Pāo Quán (Tossing Punch)",
        "items": [
          "Guà Gài Quán (Hanging & Covering Fist)",
          "Pāo Quán (Tossing Punch)"
        ]
      },
      {
        "title": "One (1) bridge technique (Qiáo Fǎ) of Gǔn Qiáo (Rolling Bridge)",
        "items": [
          "Bridge technique (Qiáo Fǎ) of Gǔn Qiáo (Rolling Bridge)"
        ]
      },
      {
        "title": "Six (6) types of stance comprising of Gōng Bù (Bow Stance), Mǎ Bù (Horse Stance), Pū Bù (Crouching Stance), Xū Bù (Empty Stance), Dié Bù (Butterfly Stance), Qí Lóng Bù (Dragon Riding Stance)",
        "items": [
          "Gōng Bù (Bow Stance)",
          "Mǎ Bù (Horse Stance)",
          "Pū Bù (Crouching Stance)",
          "Xū Bù (Empty Stance)",
          "Dié Bù (Butterfly Stance)",
          "Qí Lóng Bù (Dragon Riding Stance)"
        ]
      },
      {
        "title": "One (1) footwork technique comprising of Qílín Bù (Kirin Steps)",
        "items": [
          "Qílín Bù (Kirin Steps)"
        ]
      },
      {
        "title": "One (1) leg technique comprising of Héng Dīng Tuǐ (Horizontal Nail Kick)",
        "items": [
          "Héng Dīng Tuǐ (Horizontal Nail Kick)"
        ]
      }
    ]
  },
  {
    "id": "nandao",
    "class": "Optional Nanquan, Nandao, Nangun",
    "type": "Nandao",
    "events": [
      "ND"
    ],
    "requirements": [
      {
        "title": "Eight (8) broadsword techniques comprising of Chán Tóu (Broadsword Twining), Guǒ Nǎo (Wrapping with the Broadsword), Pī Dāo (Broadsword Chop), Mǒ Dāo (Broadsword Slicing), Gé Dāo (Broadsword Parry), Jié Dāo (Broadsword Intercept), Sǎo Dāo (Broadsword Sweeping), Jiǎn Wàn Huā Dāo (Broadsword Figure 8)",
        "items": [
          "Chán Tóu (Broadsword Twining)",
          "Guǒ Nǎo (Wrapping with the Broadsword)",
          "Pī Dāo (Broadsword Chop)",
          "Mǒ Dāo (Broadsword Slicing)",
          "Gé Dāo (Broadsword Parry)",
          "Jié Dāo (Broadsword Intercept)",
          "Sǎo Dāo (Broadsword Sweeping)",
          "Jiǎn Wàn Huā Dāo (Broadsword Figure 8)"
        ]
      },
      {
        "title": "Six (6) stances comprising of Gōng Bù (Bow Stance), Mǎ Bù (Horse Stance), Xū Bù (Empty Stance), Qí Lóng Bù (Dragon Riding Stance)",
        "items": [
          "Gōng Bù (Bow Stance)",
          "Mǎ Bù (Horse Stance)",
          "Pū Bù (Crouching Stance)",
          "Xū Bù (Empty Stance)",
          "Dié Bù (Butterfly Stance)",
          "Qí Lóng Bù (Dragon Riding Stance)"
        ]
      },
      {
        "title": "One (1) footwork technique comprising of Qílín Bù (Kirin Steps)",
        "items": [
          "Qílín Bù (Kirin Steps)"
        ]
      },
      {
        "title": "One (1) leg technique comprising of Héng Dīng Tuǐ (Horizontal Nail Kick)",
        "items": [
          "Héng Dīng Tuǐ (Horizontal Nail Kick)"
        ]
      }
    ]
  },
  {
    "id": "nangun",
    "class": "Optional Nanquan, Nandao, Nangun",
    "type": "Nangun",
    "events": [
      "NG"
    ],
    "requirements": [
      {
        "title": "Eight (8) cudgel techniques comprising of Pī Gùn (Cudgel Chop), Bēng Gùn (Cudgel Tilt), Jiǎo Gùn (Cudgel Enveloping), Gǔn Yā Gùn (Cudgel Rolling Press), Gé Gùn (Cudgel Parry), Jī Gùn (Horizontal Cudgel Strike), Dǐng Gùn (Cudgel Handle Planting), Pāo Gùn (Upward Cudgel Strike)",
        "items": [
          "Pī Gùn (Cudgel Chop)",
          "Bēng Gùn (Cudgel Tilt)",
          "Jiǎo Gùn (Cudgel Enveloping)",
          "Gǔn Yā Gùn (Cudgel Rolling Press)",
          "Gé Gùn (Cudgel Parry)",
          "Jī Gùn (Horizontal Cudgel Strike)",
          "Dǐng Gùn (Cudgel Handle Planting)",
          "Pāo Gùn (Upward Cudgel Strike)"
        ]
      },
      {
        "title": "Six (6) stances comprising of Gōng Bù (Bow Stance), Mǎ Bù (Horse Stance), Xū Bù (Empty Stance), Qí Lóng Bù (Dragon Riding Stance)",
        "items": [
          "Gōng Bù (Bow Stance)",
          "Mǎ Bù (Horse Stance)",
          "Pū Bù (Crouching Stance)",
          "Xū Bù (Empty Stance)",
          "Dié Bù (Butterfly Stance)",
          "Qí Lóng Bù (Dragon Riding Stance)"
        ]
      },
      {
        "title": "One (1) footwork technique comprising of Qílín Bù (Kirin Steps)",
        "items": [
          "Qílín Bù (Kirin Steps)"
        ]
      },
      {
        "title": "One (1) leg technique comprising of Héng Dīng Tuǐ (Horizontal Nail Kick)",
        "items": [
          "Héng Dīng Tuǐ (Horizontal Nail Kick)"
        ]
      }
    ]
  },
  {
    "id": "taijiquan",
    "class": "Optional Taijiquan, Taijijian",
    "type": "Taijiquan",
    "events": [
      "TQ"
    ],
    "requirements": [
      {
        "title": "Eight (8) techniques comprising of Lǎn Què Wěi (Grasp the Peacock’s Tail), Zuǒ Yòu Yě Mǎ Fēn Zōng (Part the Wild Horse’s Mane to the Left and Right), Zuǒ Yòu Lōu Xī Ào Bù (Brush Knee with Bent Step to the Left and Right), Yún Shǒu (Cloud Hands Wave), Chuān Suō (Work the Shuttle), Yǎn Shǒu Gōng Chuí (Strike with Concealed Fist), Zuǒ Yòu Dào Juǎn Gōng (Retreat with Arms Curling to the Left and Right), Bān Lán Chuí (Deflect, Parry and Punch)",
        "items": [
          "Lǎn Què Wěi (Grasp the Peacock’s Tail)",
          "Zuǒ Yòu Yě Mǎ Fēn Zōng (Part the Wild Horse’s Mane to the Left and Right)",
          "Zuǒ Yòu Lōu Xī Ào Bù (Brush Knee with Bent Step to the Left and Right)",
          "Yún Shǒu (Cloud Hands Wave)",
          "Chuān Suō (Work the Shuttle)",
          "Yǎn Shǒu Gōng Chuí (Strike with Concealed Fist)",
          "Zuǒ Yòu Dào Juǎn Gōng (Retreat with Arms Curling to the Left and Right)",
          "Bān Lán Chuí (Deflect, Parry and Punch)"
        ]
      },
      {
        "title": "Six (6) stances comprising of Gōng Bù (Bow Stance), Mǎ Bù (Horse Stance), Xū Bù (Empty Stance), Qí Lóng Bù (Dragon Riding Stance)",
        "items": [
          "Gōng Bù (Bow Stance)",
          "Mǎ Bù (Horse Stance)",
          "Pū Bù (Crouching Stance)",
          "Xū Bù (Empty Stance)",
          "Dié Bù (Butterfly Stance)",
          "Qí Lóng Bù (Dragon Riding Stance)"
        ]
      },
      {
        "title": "Two (2) different leg techniques",
        "items": [
          "Leg Technique #1",
          "Leg Technique #2"
        ]
      }
    ]
  },
  {
    "id": "taijijian",
    "class": "Optional Taijiquan, Taijijian",
    "type": "Taijijian",
    "events": [
      "TJ"
    ],
    "requirements": [
      {
        "title": "Eight (8) sword techniques comprising of Cì Jiàn (Straight Sword Thrust), Zuǒ Yòu Guà Jiàn (Straight Sword Hooking Parry to the Left and Right), Liāo Jiàn (Straight Sword Uppercut), Diǎn Jiàn (Straight Sword Pointing), Pī Jiàn (Straight Sword Chop), Jié Jiàn (Straight Sword Intercept), Mǒ Jiàn (Straight Sword Slicing), Jiǎo Jiàn (Straight Sword Enveloping)",
        "items": [
          "Cì Jiàn (Straight Sword Thrust)",
          "Zuǒ Yòu Guà Jiàn (Straight Sword Hooking Parry to the Left and Right)",
          "Liāo Jiàn (Straight Sword Uppercut)",
          "Diǎn Jiàn (Straight Sword Pointing)",
          "Pī Jiàn (Straight Sword Chop)",
          "Jié Jiàn (Straight Sword Intercept)",
          "Mǒ Jiàn (Straight Sword Slicing)",
          "Jiǎo Jiàn (Straight Sword Enveloping)"
        ]
      },
      {
        "title": "Three (3) stances comprising of Gōng Bù (Bow Stance), Pū Bù (Crouching Stance), Xū Bù (Empty Stance)",
        "items": [
          "Gōng Bù (Bow Stance)",
          "Pū Bù (Crouching Stance)",
          "Xū Bù (Empty Stance)"
        ]
      },
      {
        "title": "Two (2) different leg techniques",
        "items": [
          "Leg Technique #1",
          "Leg Technique #2"
        ]
      }
    ]
  },
  {
    "id": "barehand-duilian",
    "class": "Duilian (Choreographed Sparring)",
    "type": "Barehand Duilian",
    "events": [],
    "requirements": [
      {
        "title": "Three (3) types of fist techniques",
        "items": [
          "Fist #1",
          "Fist #2",
          "Fist #3"
        ]
      },
      {
        "title": "Two (2) types of palm techniques",
        "items": [
          "Palm #1",
          "Palm #2"
        ]
      },
      {
        "title": "Five (5) types of leg techniques",
        "items": [
          "Leg Technique #1",
          "Leg Technique #2",
          "Leg Technique #3",
          "Leg Technique #4",
          "Leg Technique #5"
        ]
      },
      {
        "title": "Two (2) types of break-fall methods",
        "items": [
          "Break-fall Method #1",
          "Break-fall Method #2"
        ]
      }
    ]
  },
  {
    "id": "weapon-duilian",
    "class": "Duilian (Choreographed Sparring)",
    "type": "Weapon Duilian",
    "events": [],
    "requirements": [
      {
        "title": "Six (6) types of weapon technique",
        "items": [
          "Weapon Technique #1",
          "Weapon Technique #2",
          "Weapon Technique #3",
          "Weapon Technique #4",
          "Weapon Technique #5",
          "Weapon Technique #6"
        ]
      },
      {
        "title": "Two (2) types of leg techniques",
        "items": [
          "Leg Technique #1",
          "Leg Technique #2"
        ]
      },
      {
        "title": "One (1) types of break-fall methods",
        "items": [
          "Break-fall Method #1"
        ]
      }
    ]
  },
  {
    "id": "barehand-vs-weapon-duilian",
    "class": "Duilian (Choreographed Sparring)",
    "type": "Barehand vs. Weapon Duilian",
    "events": [],
    "requirements": [
      {
        "title": "Three (3) types of fist techniques",
        "items": [
          "Fist Technique #1",
          "Fist Technique #2",
          "Fist Technique #3"
        ]
      },
      {
        "title": "Four (4) types of weapon techniques",
        "items": [
          "Weapon Technique #1",
          "Weapon Technique #2",
          "Weapon Technique #3",
          "Weapon Technique #4"
        ]
      },
      {
        "title": "Two (2) types of break-fall methods",
        "items": [
          "Break-fall Method #1",
          "Break-fall Method #2"
        ]
      }
    ]
  },
  {
    "id": "jiti-group-routine",
    "class": "Jiti (Group Routine)",
    "type": "Jiti (Group Routine)",
    "events": [],
    "requirements": [
      {
        "title": "Five (5) types of hand/fist techniques or weapon techniques",
        "items": [
          "Hand/Fist Technique or Weapon Technique #1",
          "Hand/Fist Technique or Weapon Technique #2",
          "Hand/Fist Technique or Weapon Technique #3",
          "Hand/Fist Technique or Weapon Technique #4",
          "Hand/Fist Technique or Weapon Technique #5"
        ]
      },
      {
        "title": "Five (5) types of stances",
        "items": [
          "Stance #1",
          "Stance #2",
          "Stance #3",
          "Stance #4",
          "Stance #5"
        ]
      },
      {
        "title": "Four (4) types of leg techniques",
        "items": [
          "Leg Technique #1",
          "Leg Technique #2",
          "Leg Technique #3",
          "Leg Technique #4"
        ]
      },
      {
        "title": "Three (3) types of jumping techniques",
        "items": [
          "Jumping Technique #1",
          "Jumping Technique #2",
          "Jumping Technique #3"
        ]
      },
      {
        "title": "At minimum five (5) differing types of altering pattern formations",
        "items": [
          "Formation #1",
          "Formation #2",
          "Formation #3",
          "Formation #4",
          "Formation #5"
        ]
      }
    ]
  }
];
