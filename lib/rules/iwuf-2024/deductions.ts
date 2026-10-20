import type { EventCode } from "@/lib/domain/types";
import type { RuleSource } from "../types";

/**
 * Panel A deduction codes, grouped by event family.
 *
 * Migrated as-is from the legacy app (legacy/src/views/toolkit/deduction-code-lookup).
 * They follow the IWUF Taolu rules the legacy app was written against and have
 * NOT been checked against the IWUF 2024 Taolu Competition Rules
 * (OPEN_QUESTIONS #2). The page shows a "pending verification" note while
 * `DEDUCTIONS_SOURCE.verified` is false.
 */

export interface DeductionCode {
  code: string;
  /** Pinyin name, when the source gives one. */
  name: string;
  english: string;
  category: string;
  /** Each error that this code covers. */
  content: string[];
}

export interface DeductionGroup {
  id: "northern" | "southern" | "taichi" | "duilian" | "jiti";
  title: string;
  events: EventCode[];
  standards: string[];
  codes: DeductionCode[];
}

export const DEDUCTIONS_SOURCE: RuleSource = {
  title: "IWUF Wushu Taolu Competition Rules and Judging Methods",
  revision: "2024 (pending verification; codes migrated from legacy app)",
  url: "https://www.iwuf.org/",
  verified: false,
};

export const DEDUCTION_GROUPS: DeductionGroup[] = [
  {
    "id": "northern",
    "title": "Changquan, Jianshu, Daoshu, Qiangshu & Gunshu",
    "events": [
      "CQ",
      "DS",
      "JS",
      "GS",
      "QS"
    ],
    "standards": [
      "Within a single technique, should there be 1 or more errors, 0.1 will be deducted once.",
      "Within a single group of movements, should there be 2 or more occurrences of the same weapon technique errors, 0.1 will only be deducted once.",
      "For balance techniques held for less than 2 seconds, 0.1 will be deducted once.",
      "No obvious vertical circle formed/No obvious horizontal circle formed refers to the tip of the sword/cudgel/spear tip rotating at an angle of 45° or more off of the vertical/horizontal plane.",
      "Sway: A sway is defined an athlete’s upper body is displaced (sways) in 2 different directions. For example, the athlete loses his center of balance and leans his or her upper body to maintain his balance, either left or right, forward and backwards, or inacircular motion ending upright, it is regarded as a sway.",
      "Shuffle: This refers to a situation when standing or landing on both feet or on a singlefoot or on one foot and one leg. Should any supporting foot move or be displaced laterally it is considered as a shuffle.",
      "Skip: This refers to a situation when standing or landing on both feet or on a single foot. Should any supporting foot leave the carpet in a skip or hop it is considered a skip.",
      "Additional Support: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of a hand, elbow, knee, non- supporting leg (during a single leg posture) or the weapon as an additional support it isconsidered as an additional support. (Note: should the weapon hit the floor during the course of a movement without any force applied to it as additional support it should be considered as a weapon hitting the body or floor and be deducted for accordingly).",
      "Fall: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of both hands, the head, the upper arm (above the elbow), shoulder, torso, buttocks; or should any two or more parts of the body simultaneously make contact with the floor, or one part of the body and the weapon (the weapon is considered an extension of the arm), it is considered as a fall. (Note: In Choreographed Sparring events, intentional falls to the ground are neither considered as nor deducted for as falls).",
      "Weapon-Touching-Body: Should an athlete during a technique with a weapon strike, tap or touch any part of his/her body, it will be considered as weapon-touching-body and be deducted accordingly.",
      "Weapon Deformed: This refers to when the weapon has been deformed to degree in excess of 45° from its original intended shape.",
      "Out-of-bounds: Should an athlete during his/her performance, touch the floor outsideof the boundary line of the competition arena with any part of his/her body, it is considered as out-of-bounds. Should the weapon touch the floor outside of the boundary line of the competition arena; or if any part of the performer’s body is extended beyond the boundary line of the competition arena but does not make contact with the floor it is not considered as out-of-bounds.",
      "Balance Technique Static/Motionless Timing: Calculation of time begins when the movement first stops in a static or motionless state. This applies to Changquan, Jianshu, Daoshu, Qiangshu & Gunshu events only.",
      "Forgetting: Should an athlete during his/her performance have a lapse of memory and be interrupted and pause unconventionally or have chaotic movements, it is considered as forgetting.",
      "Should during a single technique, more than one <other error> occur, they will be deducted in a cumulative manner",
      "Other Errors will be deducted as they occur in a cumulative manner."
    ],
    "codes": [
      {
        "code": "01",
        "name": "Quán",
        "english": "Fist",
        "category": "Hand Forms/Shapes",
        "content": [
          "Face of fist uneven",
          "The thumb is not pressing on the second segment of the middle finger"
        ]
      },
      {
        "code": "02",
        "name": "Zhǎng",
        "english": "Palm",
        "category": "Hand Forms/Shapes",
        "content": [
          "Four fingers not straight and held together",
          "Thumb is not bent and held in tightly"
        ]
      },
      {
        "code": "03",
        "name": "Gōu Shǒu",
        "english": "Hook",
        "category": "Hand Forms/Shapes",
        "content": [
          "The five fingers are not pinched together",
          "Wrist not hooked completely"
        ]
      },
      {
        "code": "04",
        "name": "Jiàn Zhǐ",
        "english": "Sword Fingers",
        "category": "Hand Forms/Shapes",
        "content": [
          "Index finger and middle finger not kept straight and together",
          "Thumb not pressing on the ring finger and little finger"
        ]
      },
      {
        "code": "10",
        "name": "Bān Jiǎo Cháo Tiān Zhí Lì",
        "english": "Grasp the foot and bring it to head level with the leg held vertically while remaining standing",
        "category": "Balance Techniques",
        "content": [
          "Supporting Leg Bent",
          "Raised Leg Bent"
        ]
      },
      {
        "code": "10",
        "name": "Cè Tī Bào Jiǎo Zhí Lì",
        "english": "Side kick up to catch the foot at head level with the leg held vertically while remaining standing",
        "category": "Balance Techniques",
        "content": [
          "Supporting Leg Bent",
          "Raised Leg Bent"
        ]
      },
      {
        "code": "11",
        "name": "Hòu Tī Bào Jiǎo Zhí Lì",
        "english": "Back kick and hold the leg vertically while remaining standing",
        "category": "Balance Techniques",
        "content": [
          "Torso leaning forward more than 45 degrees"
        ]
      },
      {
        "code": "12",
        "name": "Yǎng Shēn Píng Héng",
        "english": "Backward Leaning Balance",
        "category": "Balance Techniques",
        "content": [
          "The raised leg is held below horizontal level"
        ]
      },
      {
        "code": "13",
        "name": "Shí Zì Píng Héng",
        "english": "Forward Leaning Balance with Arms Outspread",
        "category": "Balance Techniques",
        "content": [
          "The torso is below horizontal level",
          "Supporting leg bent"
        ]
      },
      {
        "code": "14",
        "name": "Kòu Tuǐ Píng Héng",
        "english": "Rear Cross-legged Balance",
        "category": "Balance Techniques",
        "content": [
          "Thigh of supporting leg is not at horizontal level"
        ]
      },
      {
        "code": "14",
        "name": "Pán Tuǐ Píng Héng",
        "english": "Front Cross Legged Balance",
        "category": "Balance Techniques",
        "content": [
          "Thigh of supporting leg is not at horizontal level"
        ]
      },
      {
        "code": "15",
        "name": "Cè Shēn Píng Héng",
        "english": "Sideways Leaning Balance",
        "category": "Balance Techniques",
        "content": [
          "Supporting leg bent",
          "Raised leg bent"
        ]
      },
      {
        "code": "15",
        "name": "Tàn Hǎi Píng Héng",
        "english": "Exploring the Ocean Balance",
        "category": "Balance Techniques",
        "content": [
          "Supporting leg bent",
          "Raised leg bent"
        ]
      },
      {
        "code": "16",
        "name": "Wàng Yuè Píng Héng",
        "english": "Gazing at the Moon Balance",
        "category": "Balance Techniques",
        "content": [
          "Torso held higher than 45 degrees above horizontal level",
          "Waist not twisted toward the rear in the direction of the supporting leg",
          "Surface of the foot of the raised bent leg not extended flat"
        ]
      },
      {
        "code": "20",
        "name": "Qián Sǎo Tuǐ",
        "english": "Front Sweep",
        "category": "Leg Techniques",
        "content": [
          "The thigh of supporting leg is above horizontal level",
          "The sole of sweeping foot leaves the ground after making contact for the sweeping action",
          "Sweeping leg obviously bent 45° or more"
        ]
      },
      {
        "code": "21",
        "name": "Hòu Sǎo Tuǐ",
        "english": "Back Sweep",
        "category": "Leg Techniques",
        "content": [
          "The sole of sweeping foot leaves the ground after making contact for the sweeping action",
          "Sweeping leg obviously bent 45° or more"
        ]
      },
      {
        "code": "22",
        "name": "Diē Shù Chā",
        "english": "Falling Front Split",
        "category": "Leg Techniques",
        "content": [
          "The sole of the front foot turns inward and touches the ground",
          "Rear leg obviously bent 45° or more"
        ]
      },
      {
        "code": "23",
        "name": "Tán Tuǐ",
        "english": "Snap/Spring Kick",
        "category": "Leg Techniques",
        "content": [
          "The kicking leg does not transition from obviously bent (45° or more) to completely straight"
        ]
      },
      {
        "code": "23",
        "name": "Dēng Tuǐ",
        "english": "Heel Push Kick",
        "category": "Leg Techniques",
        "content": [
          "The kicking leg does not transition from obviously bent (45° or more) to completely straight"
        ]
      },
      {
        "code": "23",
        "name": "Chuài Tuǐ",
        "english": "Side Kick",
        "category": "Leg Techniques",
        "content": [
          "The kicking leg does not transition from obviously bent (45° or more) to completely straight"
        ]
      },
      {
        "code": "24",
        "name": "Zhèng Tī Tuǐ",
        "english": "Front Stretch Kick",
        "category": "Leg Techniques",
        "content": [
          "Knee/s bent at the apex of the kick",
          "Heel of supporting leg off the floor"
        ]
      },
      {
        "code": "24",
        "name": "Cè Tī Tuǐ",
        "english": "Side Stretch Kick",
        "category": "Leg Techniques",
        "content": [
          "Knee/s bent at the apex of the kick",
          "Heel of supporting leg off the floor"
        ]
      },
      {
        "code": "25",
        "name": "Lǐ Hé Pāi Jiǎo",
        "english": "Inward Slap Kick",
        "category": "Leg Techniques",
        "content": [
          "Toes of slapped foot below shoulder height",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "25",
        "name": "Bǎi Lián Pāi Jiǎo",
        "english": "Lotus Slap Kick",
        "category": "Leg Techniques",
        "content": [
          "Toes of slapped foot below shoulder height",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "25",
        "name": "Dān Pāi Jiǎo",
        "english": "Front Slap Kick",
        "category": "Leg Techniques",
        "content": [
          "Toes of slapped foot below shoulder height",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "26",
        "name": "Tí Xī Dú Lì",
        "english": "Single Knee Raised Position",
        "category": "Leg Techniques",
        "content": [
          "Raised knee below waist level",
          "Raised foot's toes not pointed and hooking inwards"
        ]
      },
      {
        "code": "30",
        "name": "Téng Kōng Fēi Jiǎo",
        "english": "Jumping Front Slap Kick",
        "category": "Jumping Techniques",
        "content": [
          "Toes of slapped foot below shoulder height",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "30",
        "name": "Téng Kōng Xié Fēi Jiǎo",
        "english": "Jumping Slant Kick",
        "category": "Jumping Techniques",
        "content": [
          "Toes of slapped foot below shoulder height",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "30",
        "name": "Téng Kōng Shuāng Fēi Jiǎo",
        "english": "Jumping Double Front Slap Kick",
        "category": "Jumping Techniques",
        "content": [
          "Toes of slapped foot below shoulder height",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "30",
        "name": "Xuàn Fēng Jiǎo",
        "english": "Tornado Kick",
        "category": "Jumping Techniques",
        "content": [
          "Toes of slapped foot below shoulder height",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "30",
        "name": "Téng Kōng Bǎi Lián",
        "english": "Jumping Lotus Kick",
        "category": "Jumping Techniques",
        "content": [
          "Toes of slapped foot below shoulder height",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "31",
        "name": "Téng Kōng Zhèng Tī Tuǐ",
        "english": "Jumping Front Straight Kick",
        "category": "Jumping Techniques",
        "content": [
          "Hanging leg bent at the apex of the kick"
        ]
      },
      {
        "code": "32",
        "name": "Cè Kōng Fān",
        "english": "Aerial Cartwheel",
        "category": "Jumping Techniques",
        "content": [
          "Leg(s) obviously bent 45° or more while in the air"
        ]
      },
      {
        "code": "32",
        "name": "Cè Kōng Fān Zhuǎn Tǐ 360°",
        "english": "Aerial Cartwheel Twist 360°",
        "category": "Jumping Techniques",
        "content": [
          "Leg(s) obviously bent 45° or more while in the air"
        ]
      },
      {
        "code": "33",
        "name": "Xuànzi",
        "english": "Butterfly Kick",
        "category": "Jumping Techniques",
        "content": [
          "Angle of the torso is 45° or above during the twist",
          "Leg/s obviously bent 45° or more while in the air"
        ]
      },
      {
        "code": "33",
        "name": "Xuàn Zǐ Zhuǎn Tǐ",
        "english": "Butterfly Twist",
        "category": "Jumping Techniques",
        "content": [
          "Angle of the torso is 45° or above during the twist",
          "Leg/s obviously bent 45° or more while in the air"
        ]
      },
      {
        "code": "34",
        "name": "Téng Kōng Jiàn Tàn",
        "english": "Jumping Snap/Spring Kick",
        "category": "Jumping Techniques",
        "content": [
          "Snap/Spring (pushing) leg does not transition from obviously bent (45° or more) to completely straight",
          "Snap/Spring (pushing) leg below horizontal level"
        ]
      },
      {
        "code": "34",
        "name": "Téng Kōng Dēng Tuǐ",
        "english": "Jumping Heel Push Kick",
        "category": "Jumping Techniques",
        "content": [
          "Snap/Spring (pushing) leg does not transition from obviously bent (45° or more) to completely straight",
          "Snap/Spring (pushing) leg below horizontal level"
        ]
      },
      {
        "code": "50",
        "name": "Gōng Bù",
        "english": "Bow Stance",
        "category": "Stances & Footwork",
        "content": [
          "The knee of the front leg is not above the instep",
          "The thigh of the bending (front) leg is not parallel to the ground",
          "Any portion of the sole of the rear leg obviously off the floor",
          "The rear foot is not hooked inwards with the toes pointing obliquely forwards."
        ]
      },
      {
        "code": "51",
        "name": "Mǎ Bù",
        "english": "Horse Stance",
        "category": "Stances & Footwork",
        "content": [
          "Thighs not horizontal",
          "The distance between the inner portions of the two feet is narrower than performer's shoulder width",
          "Knee/s buckling inwards",
          "The heel/s raised off the ground",
          "Toes of foot/feet pointing outward 45° degrees or more"
        ]
      },
      {
        "code": "52",
        "name": "Xū Bù",
        "english": "Empty Stance",
        "category": "Stances & Footwork",
        "content": [
          "Thigh of squatting leg is not parallel to the ground",
          "The heel of supporting foot is raised off the ground"
        ]
      },
      {
        "code": "53",
        "name": "Pū Bù",
        "english": "Crouching Stance",
        "category": "Stances & Footwork",
        "content": [
          "The back of the thigh of the squatting leg is not in contact with the calf",
          "The extended leg is not completely straight",
          "Extended leg's foot is not turned inwards with the sole completely flat on the ground"
        ]
      },
      {
        "code": "54",
        "name": "Xiē Bù",
        "english": "Cross-Legged Crouching Stance",
        "category": "Stances & Footwork",
        "content": [
          "The two legs are not crossed",
          "The buttocks are not in contact with the calf of the sitting leg"
        ]
      },
      {
        "code": "58",
        "name": "Zuò Pán",
        "english": "Cross-Legged Sitting",
        "category": "Stances & Footwork",
        "content": [
          "Neither one of the buttocks are in contact with the floor",
          "Either one of the feet is in contact with the floor"
        ]
      },
      {
        "code": "60",
        "name": "Guà Jiàn",
        "english": "Straight Sword Hooking Parry",
        "category": "Weapon Techniques",
        "content": [
          "Straight sword and forearm are aligned",
          "No obvious vertical circle formed"
        ]
      },
      {
        "code": "60",
        "name": "Liāo Jiàn",
        "english": "Straight Sword Uppercut",
        "category": "Weapon Techniques",
        "content": [
          "Straight sword and forearm are aligned",
          "No obvious vertical circle formed"
        ]
      },
      {
        "code": "61",
        "name": "Wò Jiàn",
        "english": "Gripping the Straight Sword",
        "category": "Weapon Techniques",
        "content": [
          "Any finger wraps around the top of the hand guard and touches the edge of the blade"
        ]
      },
      {
        "code": "62",
        "name": "Chán Tóu",
        "english": "Broadsword Twining",
        "category": "Weapon Techniques",
        "content": [
          "The back of the broadsword blade is not kept close to the body when wrapping or twining"
        ]
      },
      {
        "code": "62",
        "name": "Guǒ Nǎo",
        "english": "Wrapping with the Broadsword",
        "category": "Weapon Techniques",
        "content": [
          "The back of the broadsword blade is not kept close to the body when wrapping or twining"
        ]
      },
      {
        "code": "63",
        "name": "Lán Qiāng",
        "english": "Outward Blocking",
        "category": "Weapon Techniques",
        "content": [
          "Spear head not travelling in a clearly defined arc",
          "Spear end protruding from grip (extending past rear grip)",
          "The thrusting arm and the spear shaft do not form a straight line horizontally"
        ]
      },
      {
        "code": "63",
        "name": "Ná Qiāng",
        "english": "Inward Blocking with the Spear",
        "category": "Weapon Techniques",
        "content": [
          "Spear head not travelling in a clearly defined arc",
          "Spear end protruding from grip (extending past rear grip)",
          "The thrusting arm and the spear shaft do not form a straight line horizontally"
        ]
      },
      {
        "code": "63",
        "name": "Zhā Qiāng",
        "english": "Spear Thrust",
        "category": "Weapon Techniques",
        "content": [
          "Spear head not travelling in a clearly defined arc",
          "Spear end protruding from grip (extending past rear grip)",
          "The thrusting arm and the spear shaft do not form a straight line horizontally"
        ]
      },
      {
        "code": "64",
        "name": "Píng Lūn Gùn",
        "english": "Horizontal Cudgel Windmill Waving with one hand",
        "category": "Weapon Techniques",
        "content": [
          "No obvious horizontal circle formed"
        ]
      },
      {
        "code": "65",
        "name": "Lì Wǔ Huā Qiāng",
        "english": "Vertical Figure “8” with the Spear",
        "category": "Weapon Techniques",
        "content": [
          "The spear/cudgel does not rotate in an obvious vertical plane"
        ]
      },
      {
        "code": "65",
        "name": "Lì Wǔ Huā Qiāng",
        "english": "Vertical Figure “8” with the Spear",
        "category": "Weapon Techniques",
        "content": [
          "The spear/cudgel does not rotate in an obvious vertical plane"
        ]
      },
      {
        "code": "65",
        "name": "Lì Wǔ Huā Gùn",
        "english": "Vertical Figure“8” with the Cudgel",
        "category": "Weapon Techniques",
        "content": [
          "The spear/cudgel does not rotate in an obvious vertical plane"
        ]
      },
      {
        "code": "65",
        "name": "Shuāng Shǒu Tí Liāo Huā Gùn",
        "english": "Vertical Uppercutting Cudgel with Both Hands",
        "category": "Weapon Techniques",
        "content": [
          "The spear/cudgel does not rotate in an obvious vertical plane"
        ]
      },
      {
        "code": "66",
        "name": "Qì Xiè Pāo Jiē",
        "english": "Weapon Throwing & Catching Techniques",
        "category": "Weapon Techniques",
        "content": [
          "Weapon caught in a hugging manner.",
          "Failure to catch the straight sword/broadsword by the handle; the cudgel/spear shaft with a single hand."
        ]
      },
      {
        "code": "70",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Torso sways (deduct 0.10)"
        ]
      },
      {
        "code": "70",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Foot shuffles or skips (deduct 0.10)"
        ]
      },
      {
        "code": "71",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Additional Support (deduct 0.20)"
        ]
      },
      {
        "code": "72",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Fall (deduct 0.30)"
        ]
      },
      {
        "code": "73",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon unintentionally makes contact with the floor (deduct 0.10)",
          "Loss of grip (deduct 0.10)",
          "Weapon strikes the body (deduct 0.10)",
          "Weapon deforms (deduct 0.10)"
        ]
      },
      {
        "code": "74",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon Broken (deduct 0.20)"
        ]
      },
      {
        "code": "75",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon dropped on the floor (deduct 0.30)"
        ]
      },
      {
        "code": "76",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Broad Sword Ribbon; Straight sword Tassel; Spear Tassel; Garment Item; Headwear dropped on the floor (deduct 0.10)",
          "Broad Sword Ribbon; Straight sword Tassel; Soft Weapon entangles hand or body (deduct 0.10)"
        ]
      },
      {
        "code": "77",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Balance technique not maintained for at least 2 seconds (deduct 0.10)"
        ]
      },
      {
        "code": "78",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Any part of competitors body touches floor outside carpet boundary line. (deduct 0.10)"
        ]
      },
      {
        "code": "79",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Forgetting (Movement Forgotten) (deduct 0.10)"
        ]
      },
      {
        "code": "80",
        "name": "",
        "english": "Content",
        "category": "Content",
        "content": [
          "For each missing compulsory/mandatory technique in optional routines (deduct 0.20)",
          "For each missing/additional technique in compulsory routines (deduct 0.20)",
          "For each instance of altering part of a technique (deduct 0.20)"
        ]
      },
      {
        "code": "81",
        "name": "",
        "english": "Content",
        "category": "Compulsory Routines",
        "content": [
          "Missing or additional step"
        ]
      },
      {
        "code": "82",
        "name": "",
        "english": "Content",
        "category": "Nanquan Type Compulsory Routines",
        "content": [
          "For each missing or additional vocalization (deduct 0.20)"
        ]
      },
      {
        "code": "83",
        "name": "",
        "english": "Structure & Composition",
        "category": "Obvious unmethodical pause",
        "content": [
          "A static state (excluding balance techniques) which is held for longer than 3 seconds; During a Taijiquan or Taijijian there is an unmethodical pause prior to the execution of Degree of Difficulty technique, etc."
        ]
      },
      {
        "code": "84",
        "name": "",
        "english": "Structure & Composition",
        "category": "Compulsory Routines",
        "content": [
          "For Changquan type and Nanquan Type events (including weapon routines), movements done in averted directions exceeding 45 degrees. For Taijiquan and Taijijian events, movements done in averted directions exceeding 90 degrees."
        ]
      },
      {
        "code": "85",
        "name": "",
        "english": "Music",
        "category": "Events Requiring Musical Accompaniment",
        "content": [
          "No music or music which includes vocals/lyrics (deduct 0.50)"
        ]
      }
    ]
  },
  {
    "id": "southern",
    "title": "Nanquan, Nandao & Nangun",
    "events": [
      "NQ",
      "ND",
      "NG"
    ],
    "standards": [
      "Within a single technique, should there be 1 or more errors, 0.1 will only be deducted once.",
      "Within a single group of movements, should there be 2 or more occurrences of the same weapon technique errors, 0.1 will only be deducted once.",
      "It is permitted to not slap the kicking foot during Téng Kōng Way Bǎi Tuǐ (Jumping Lotus Kick).",
      "Sway: A sway is defined an athlete’s upper body is displaced (sways) in 2 different directions. For example, the athlete loses his center of balance and leans his or her upper body to maintain his balance, either left or right, forward and backwards, or inacircular motion ending upright, it is regarded as a sway.",
      "Shuffle: This refers to a situation when standing or landing on both feet or on a singlefoot or on one foot and one leg. Should any supporting foot move or be displaced laterally it is considered as a shuffle.",
      "Skip: This refers to a situation when standing or landing on both feet or on a single foot. Should any supporting foot leave the carpet in a skip or hop it is considered a skip.",
      "Additional Support: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of a hand, elbow, knee, non- supporting leg (during a single leg posture) or the weapon as an additional support it isconsidered as an additional support. (Note: should the weapon hit the floor during the course of a movement without any force applied to it as additional support it should be considered as a weapon hitting the body or floor and be deducted for accordingly).",
      "Fall: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of both hands, the head, the upper arm (above the elbow), shoulder, torso, buttocks; or should any two or more parts of the body simultaneously make contact with the floor, or one part of the body and the weapon (the weapon is considered an extension of the arm), it is considered as a fall. (Note: In Choreographed Sparring events, intentional falls to the ground are neither considered as nor deducted for as falls).",
      "Weapon-Touching-Body: Should an athlete during a technique with a weapon strike, tap or touch any part of his/her body, it will be considered as weapon-touching-body and be deducted accordingly.",
      "Weapon Deformed: This refers to when the weapon has been deformed to degree in excess of 45° from its original intended shape.",
      "Out-of-bounds: Should an athlete during his/her performance, touch the floor outsideof the boundary line of the competition arena with any part of his/her body, it is considered as out-of-bounds. Should the weapon touch the floor outside of the boundary line of the competition arena; or if any part of the performer’s body is extended beyond the boundary line of the competition arena but does not make contact with the floor it is not considered as out-of-bounds.",
      "Balance Technique Static/Motionless Timing: Calculation of time begins when the movement first stops in a static or motionless state. This applies to Changquan, Jianshu, Daoshu, Qiangshu & Gunshu events only.",
      "Forgetting: Should an athlete during his/her performance have a lapse of memory and be interrupted and pause unconventionally or have chaotic movements, it is considered as forgetting.",
      "Should during a single technique, more than one <other error> occur, they will be deducted in a cumulative manner",
      "Other Errors will be deducted as they occur in a cumulative manner."
    ],
    "codes": [
      {
        "code": "01",
        "name": "Quán",
        "english": "Fist",
        "category": "Hand Forms/Shapes",
        "content": [
          "Face of fist uneven",
          "The thumb is not pressing on the second segment of the middle finger"
        ]
      },
      {
        "code": "02",
        "name": "Hǔ Zhǎo",
        "english": "Tiger’s Claw",
        "category": "Hand Forms/Shapes",
        "content": [
          "Five fingers not separated with the first and second joins of each finger not hooked and flexed",
          "Center of the palm not pressed out"
        ]
      },
      {
        "code": "03",
        "name": "Hè Zuǐ",
        "english": "Crane's Beak",
        "category": "Hand Forms/Shapes",
        "content": [
          "Five Fingers not pinched together",
          "Wrist flexed (bent) when striking"
        ]
      },
      {
        "code": "04",
        "name": "Dān Zhǐ Zhǎng",
        "english": "Single Finger Palm",
        "category": "Hand Forms/Shapes",
        "content": [
          "Index finger not Straight",
          "The other 4 fingers not tightly bent/hooked"
        ]
      },
      {
        "code": "20",
        "name": "Qián Sǎo Tuǐ",
        "english": "Front Sweep",
        "category": "Leg Techniques",
        "content": [
          "The thigh of supporting leg is above horizontal level",
          "The sole of sweeping foot leaves the ground after making contact for the sweeping action",
          "Sweeping leg obviously bent 45° or more"
        ]
      },
      {
        "code": "23",
        "name": "Héng Cǎi Tuǐ",
        "english": "Horizontal Stamping Kick",
        "category": "Leg Techniques",
        "content": [
          "The kicking leg does not transition from obviously bent (45° or more) to completely straight"
        ]
      },
      {
        "code": "23",
        "name": "Dēng Tuǐ",
        "english": "Heel Push Kick",
        "category": "Leg Techniques",
        "content": [
          "The kicking leg does not transition from obviously bent (45° or more) to completely straight"
        ]
      },
      {
        "code": "23",
        "name": "Hǔ Wěi Tuǐ",
        "english": "Tiger Tail Kick",
        "category": "Leg Techniques",
        "content": [
          "The kicking leg does not transition from obviously bent (45° or more) to completely straight"
        ]
      },
      {
        "code": "25",
        "name": "Zhuǎn Shēn Hòu Bǎi Tuǐ",
        "english": "Turning Back Crescent Kick",
        "category": "Leg Techniques",
        "content": [
          "Kicking leg bent",
          "Toes of the kicking leg do not exceed waist height"
        ]
      },
      {
        "code": "26",
        "name": "Tí Xī Dú Lì",
        "english": "Single Knee Raised Position",
        "category": "Leg Techniques",
        "content": [
          "Raised knee below waist level",
          "Raised foot’s toes not pointed and hooking inwards"
        ]
      },
      {
        "code": "27",
        "name": "Héng Dīng Tuǐ",
        "english": "Horizontal Nail Kick",
        "category": "Leg Techniques",
        "content": [
          "The front (kicking) leg does not transition from bent (less than 45°) to completely straight",
          "The front (kicking) leg does not travel horizontally across to the opposite side of the body",
          "The toes of the kicking foot are not pulled back"
        ]
      },
      {
        "code": "30",
        "name": "Téng Kōng Fēi Jiǎo",
        "english": "Jumping Front Slap Kick",
        "category": "Jumping Techniques",
        "content": [
          "Toes of the slapped foot or kicked leg are below shoulder level",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "30",
        "name": "Xuàn Fēng Jiǎo",
        "english": "Tornado Kick",
        "category": "Jumping Techniques",
        "content": [
          "Toes of the slapped foot or kicked leg are below shoulder level",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "30",
        "name": "Téng Kōng Bǎi Lián",
        "english": "Jumping Lotus Kick",
        "category": "Jumping Techniques",
        "content": [
          "Toes of the slapped foot or kicked leg are below shoulder level",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "32",
        "name": "Cè Kōng Fān",
        "english": "Aerial Cartwheel",
        "category": "Jumping Techniques",
        "content": [
          "Leg/s obviously bent 45° or more while in the air"
        ]
      },
      {
        "code": "40",
        "name": "Téng Kōng Pán Tuǐ 360° Cè Pū",
        "english": "Flying Cross Legged Kick 360° to Falling on Side",
        "category": "Tumbling Techniques",
        "content": [
          "Toes of the kicking leg do not exceed head level"
        ]
      },
      {
        "code": "42",
        "name": "Téng Kōng Shuāng Cè Chuài",
        "english": "Jumping Double Side Kick",
        "category": "Tumbling Techniques",
        "content": [
          "The legs are not held close together when kicked out and/or are obviously bent when kicked out"
        ]
      },
      {
        "code": "50",
        "name": "Gōng Bù",
        "english": "Bow Stance",
        "category": "Stances & Footwork",
        "content": [
          "The thigh of the bending (front) leg is not held at a range from horizontal level to 45° degrees (excluding 45° degrees) above horizontal level",
          "The rear foot is not hooked inwards with the toes pointing obliquely forwards",
          "Any portion of the sole of the rear leg obviously off the floor"
        ]
      },
      {
        "code": "51",
        "name": "Mǎ Bù",
        "english": "Horse Stance",
        "category": "Stances & Footwork",
        "content": [
          "The thigh/s not held at a range from horizontal level to 45° degrees (excluding 45° degrees) above horizontal level",
          "The distance between the inner portions of the two feet is narrower than performers shoulder width",
          "Knee/s buckling inwards",
          "Heel/s raised off the ground"
        ]
      },
      {
        "code": "52",
        "name": "Xū Bù",
        "english": "Empty Stance",
        "category": "Stances & Footwork",
        "content": [
          "The thigh of the supporting leg is not held at a range from horizontal level to 45° degrees (excluding 45° degrees) above horizontal level",
          "Knee and toes of supporting leg misaligned"
        ]
      },
      {
        "code": "53",
        "name": "Pū Bù",
        "english": "Crouching Stance",
        "category": "Stances & Footwork",
        "content": [
          "The back of the thigh of the squatting leg is not in contact with the calf",
          "The extended leg is not completely straight",
          "Extended leg’s foot is not turned inwards with the sole completely flat on the ground"
        ]
      },
      {
        "code": "55",
        "name": "Dié Bù",
        "english": "Butterfly Stance",
        "category": "Stances & Footwork",
        "content": [
          "The inner part of the shank/calf of the splayed leg/s is not fully in contact with the ground",
          "The inner part of the ankle/heel of the splayed leg/s is not fully in contact with the ground"
        ]
      },
      {
        "code": "56",
        "name": "Guì Bù",
        "english": "Single Kneeling Stance",
        "category": "Stances & Footwork",
        "content": [
          "The knee of the lower kneeling leg touches the ground",
          "The buttock does not sit fully on the shank/calf of the lower kneeling leg"
        ]
      },
      {
        "code": "57",
        "name": "Qí Lóng Bù",
        "english": "Dragon Riding Stance",
        "category": "Stances & Footwork",
        "content": [
          "The thigh of the front leg is not held at a range from horizontal level to 45° degrees (excluding 45° degrees) above horizontal level",
          "The knee of the back leg makes contact with the ground"
        ]
      },
      {
        "code": "62",
        "name": "Chán Tóu",
        "english": "Broadsword Twining",
        "category": "Weapon Techniques",
        "content": [
          "The back of the broadsword blade is not kept close to the body when wrapping or twining"
        ]
      },
      {
        "code": "62",
        "name": "Guǒ Nǎo",
        "english": "Wrapping with the Broadsword",
        "category": "Weapon Techniques",
        "content": [
          "The back of the broadsword blade is not kept close to the body when wrapping or twining"
        ]
      },
      {
        "code": "67",
        "name": "Dǐng Gùn",
        "english": "Cudgel Handle Planting",
        "category": "Weapon Techniques",
        "content": [
          "The end of the cudgel handle is not planted firmly on the ground",
          "The tip of the cudgel is below the athlete’s head level"
        ]
      },
      {
        "code": "70",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Torso sways (deduct 0.10)"
        ]
      },
      {
        "code": "70",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Foot shuffles or skips (deduct 0.10)"
        ]
      },
      {
        "code": "71",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Additional Support (deduct 0.20)"
        ]
      },
      {
        "code": "72",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Fall (deduct 0.30)"
        ]
      },
      {
        "code": "73",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon unintentionally makes contact with the floor (deduct 0.10)",
          "Loss of grip (deduct 0.10)",
          "Weapon strikes the body (deduct 0.10)",
          "Weapon deforms (deduct 0.10)"
        ]
      },
      {
        "code": "74",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon Broken (deduct 0.20)"
        ]
      },
      {
        "code": "75",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon dropped on the floor (deduct 0.30)"
        ]
      },
      {
        "code": "76",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Broad Sword Ribbon; Straight sword Tassel; Spear Tassel; Garment Item; Headwear dropped on the floor (deduct 0.10)",
          "Broad Sword Ribbon; Straight sword Tassel; Soft Weapon entangles hand or body (deduct 0.10)"
        ]
      },
      {
        "code": "77",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Balance technique not maintained for at least 2 seconds (deduct 0.10)"
        ]
      },
      {
        "code": "78",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Any part of competitors body touches floor outside carpet boundary line. (deduct 0.10)"
        ]
      },
      {
        "code": "79",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Forgetting (Movement Forgotten) (deduct 0.10)"
        ]
      },
      {
        "code": "80",
        "name": "",
        "english": "Content",
        "category": "Content",
        "content": [
          "For each missing compulsory/mandatory technique in optional routines (deduct 0.20)",
          "For each missing/additional technique in compulsory routines (deduct 0.20)",
          "For each instance of altering part of a technique (deduct 0.20)"
        ]
      },
      {
        "code": "81",
        "name": "",
        "english": "Content",
        "category": "Compulsory Routines",
        "content": [
          "Missing or additional step"
        ]
      },
      {
        "code": "82",
        "name": "",
        "english": "Content",
        "category": "Nanquan Type Compulsory Routines",
        "content": [
          "For each missing or additional vocalization (deduct 0.20)"
        ]
      },
      {
        "code": "83",
        "name": "",
        "english": "Structure & Composition",
        "category": "Obvious unmethodical pause",
        "content": [
          "A static state (excluding balance techniques) which is held for longer than 3 seconds; During a Taijiquan or Taijijian there is an unmethodical pause prior to the execution of Degree of Difficulty technique, etc."
        ]
      },
      {
        "code": "84",
        "name": "",
        "english": "Structure & Composition",
        "category": "Compulsory Routines",
        "content": [
          "For Changquan type and Nanquan Type events (including weapon routines), movements done in averted directions exceeding 45 degrees. For Taijiquan and Taijijian events, movements done in averted directions exceeding 90 degrees."
        ]
      },
      {
        "code": "85",
        "name": "",
        "english": "Music",
        "category": "Events Requiring Musical Accompaniment",
        "content": [
          "No music or music which includes vocals/lyrics (deduct 0.50)"
        ]
      }
    ]
  },
  {
    "id": "taichi",
    "title": "Taijiquan & Taijijian",
    "events": [
      "TQ",
      "TJ",
      "TS"
    ],
    "standards": [
      "Within a single technique, should there be 1 or more errors, 0.1 will only be deducted once.",
      "Within a single group of movements, should there be 2 or more occurrences of the same weapon technique errors, 0.1 will only be deducted once.",
      "Within a single group of movements, should there be 2 or more occurrences of the same footwork error, 0.1 will only be deducted once.",
      "Within a single group of movements, should there be 2 or more occurrences of the same stance errors, 0.1 will only be deducted once. 'Single group of movements' refers to same position, hand technique, leg technique, footwork or weapon technique executed once, twice or more times in a sequence.",
      "Within a single routine, deductions for Quán (Fist), Zhǎng (Palm), Jiàn Zhǐ (Sword Fingers), Hand Technique, and Body Posture may be deducted at most three (3) times for each one respectively.",
      "Deductions will be made for the above each time they occur; however, the electronic scoring system (or score keeper for non-electronic scoring systems) will enforce a deduction limit of 0.3 for each technique.",
      "'Knee and toes of supporting leg misaligned' refers to the knee-tip of the supporting leg being drawn in and surpassing the vertical line of the medial portion of the supporting foot when stepping.",
      "Sway: A sway is defined an athlete’s upper body is displaced (sways) in 2 different directions. For example, the athlete loses his center of balance and leans his or her upper body to maintain his balance, either left or right, forward and backwards, or inacircular motion ending upright, it is regarded as a sway.",
      "Shuffle: This refers to a situation when standing or landing on both feet or on a singlefoot or on one foot and one leg. Should any supporting foot move or be displaced laterally it is considered as a shuffle.",
      "Skip: This refers to a situation when standing or landing on both feet or on a single foot. Should any supporting foot leave the carpet in a skip or hop it is considered a skip.",
      "Additional Support: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of a hand, elbow, knee, non- supporting leg (during a single leg posture) or the weapon as an additional support it isconsidered as an additional support. (Note: should the weapon hit the floor during the course of a movement without any force applied to it as additional support it should be considered as a weapon hitting the body or floor and be deducted for accordingly).",
      "Fall: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of both hands, the head, the upper arm (above the elbow), shoulder, torso, buttocks; or should any two or more parts of the body simultaneously make contact with the floor, or one part of the body and the weapon (the weapon is considered an extension of the arm), it is considered as a fall. (Note: In Choreographed Sparring events, intentional falls to the ground are neither considered as nor deducted for as falls).",
      "Weapon-Touching-Body: Should an athlete during a technique with a weapon strike, tap or touch any part of his/her body, it will be considered as weapon-touching-body and be deducted accordingly.",
      "Weapon Deformed: This refers to when the weapon has been deformed to degree in excess of 45° from its original intended shape.",
      "Out-of-bounds: Should an athlete during his/her performance, touch the floor outsideof the boundary line of the competition arena with any part of his/her body, it is considered as out-of-bounds. Should the weapon touch the floor outside of the boundary line of the competition arena; or if any part of the performer’s body is extended beyond the boundary line of the competition arena but does not make contact with the floor it is not considered as out-of-bounds.",
      "Balance Technique Static/Motionless Timing: Calculation of time begins when the movement first stops in a static or motionless state. This applies to Changquan, Jianshu, Daoshu, Qiangshu & Gunshu events only.",
      "Forgetting: Should an athlete during his/her performance have a lapse of memory and be interrupted and pause unconventionally or have chaotic movements, it is considered as forgetting.",
      "Should during a single technique, more than one <other error> occur, they will be deducted in a cumulative manner",
      "Other Errors will be deducted as they occur in a cumulative manner."
    ],
    "codes": [
      {
        "code": "01",
        "name": "Quán",
        "english": "Fist",
        "category": "Hand Forms/Shapes, Techniques & Body Posture",
        "content": [
          "Face of fist uneven",
          "The thumb is not pressing on the second segment of the middle finger"
        ]
      },
      {
        "code": "02",
        "name": "Zhǎng",
        "english": "Palm",
        "category": "Hand Forms/Shapes, Techniques & Body Posture",
        "content": [
          "Four fingers not separated (excluding special techniques)",
          "The fingers are straightened",
          "Tigers mouth not rounded (excluding special techniques)",
          "The center of the palm not drawn in and rounded (excluding special techniques)"
        ]
      },
      {
        "code": "04",
        "name": "Jiàn Zhǐ",
        "english": "Sword Fingers",
        "category": "Hand Forms/Shapes, Techniques & Body Posture",
        "content": [
          "Index finger and middle finger not kept straight and together",
          "Thumb not pressing on the ring finger and little finger"
        ]
      },
      {
        "code": "05",
        "name": "",
        "english": "Hand Technique",
        "category": "Hand Forms/Shapes, Techniques & Body Posture",
        "content": [
          "Elbow lifted",
          "Arm straight",
          "Armpit closed"
        ]
      },
      {
        "code": "06",
        "name": "",
        "english": "Body Posture",
        "category": "Hand Forms/Shapes, Techniques & Body Posture",
        "content": [
          "Head and body not aligned",
          "Shoulders hunched, rounded lower back, buttocks sticking out",
          "Shoulders shrugged",
          "Waist twisted",
          "Buttocks protruding"
        ]
      },
      {
        "code": "17",
        "name": "Dīshì Qián Dēng Cǎi Jiǎo Píng Héng",
        "english": "Forward Sole Kick with Low Step Balance",
        "category": "Balance Techniques",
        "content": [
          "The heel of the supporting leg is raised",
          "Kicking leg bent at knee",
          "The foot of the kicking leg is not turned outwards"
        ]
      },
      {
        "code": "18",
        "name": "Qián Jǔ Tuǐ Dī Shì Píng Héng",
        "english": "Low Balance with Leg Stretched Forward",
        "category": "Balance Techniques",
        "content": [
          "Forward stretched leg bends and/or drops below horizontal level at any point during transition from standing to squatting"
        ]
      },
      {
        "code": "19",
        "name": "Hòu Chā Tuǐ Dī Shì Píng Héng",
        "english": "Low Balance with Leg Crossed Behind",
        "category": "Balance Techniques",
        "content": [
          "The foot of the leg crossed behind the supporting leg makes contact with the ground"
        ]
      },
      {
        "code": "22",
        "name": "Diē Chā",
        "english": "Hurdler's Split Position",
        "category": "Leg Techniques",
        "content": [
          "Front foot turns in and touches the carpet",
          "Angle between the two legs is 45° degrees or less"
        ]
      },
      {
        "code": "23",
        "name": "Fēn Jiǎo",
        "english": "Parting Kick",
        "category": "Leg Techniques",
        "content": [
          "The raised leg is bent",
          "The raised leg is below horizontal level"
        ]
      },
      {
        "code": "23",
        "name": "Dēng Jiǎo",
        "english": "Heel Kick",
        "category": "Leg Techniques",
        "content": [
          "The raised leg is bent",
          "The raised leg is below horizontal level"
        ]
      },
      {
        "code": "25",
        "name": "Bǎi Lián Pāi Jiǎo",
        "english": "Lotus Slap Kick",
        "category": "Slap Kick Techniques",
        "content": [
          "Kicking Leg Bent When Slapped",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "25",
        "name": "Dān Pāi Jiǎo",
        "english": "Front Slap Kick",
        "category": "Slap Kick Techniques",
        "content": [
          "Kicking Leg Bent When Slapped",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "26",
        "name": "Tí Xī Dú Lì",
        "english": "Single Knee Raised Position",
        "category": "Balance Techniques",
        "content": [
          "Raised knee lower than waist level"
        ]
      },
      {
        "code": "30",
        "name": "Téng Kōng Fēi Jiǎo",
        "english": "Jumping Front Slap Kick",
        "category": "Jumping Techniques",
        "content": [
          "Toes of the slapped foot are below shoulder level",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "30",
        "name": "Xuàn Fēng Jiǎo",
        "english": "Tornado Kick",
        "category": "Jumping Techniques",
        "content": [
          "Toes of the slapped foot are below shoulder level",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "30",
        "name": "Téng Kōng Bǎi Lián",
        "english": "Jumping Lotus Kick",
        "category": "Jumping Techniques",
        "content": [
          "Toes of the slapped foot are below shoulder level",
          "Slap missed and/or inaudible"
        ]
      },
      {
        "code": "31",
        "name": "Téng Kōng Zhèng Tī Tuǐ",
        "english": "Jumping Front Straight Kick",
        "category": "Jumping Techniques",
        "content": [
          "Hanging leg bent at the apex of the kick"
        ]
      },
      {
        "code": "50",
        "name": "Gōng Bù",
        "english": "Bow Stance",
        "category": "Stances & Footwork",
        "content": [
          "Knee of front leg is not above the instep or in front of the toes",
          "The thigh of the bending (front) leg is not held at a range from horizontal level to 45° degrees (excluding 45° degrees) above horizontal level",
          "Any portion of the sole of the rear leg obviously off the floor",
          "The rear foot is not hooked inwards with the toes pointing obliquely forwards",
          "Knee of rear leg collapsed inwards passed the medial portion of the rear foot"
        ]
      },
      {
        "code": "51",
        "name": "Mǎ Bù",
        "english": "Horse Stance",
        "category": "Stances & Footwork",
        "content": [
          "The thigh/s are not held at a range from horizontal level to 45° degrees (excluding 45° degrees) above horizontal level",
          "Knee/s collapsed inwards passed the medial portion of the foot/feet"
        ]
      },
      {
        "code": "52",
        "name": "Xū Bù",
        "english": "Empty Stance",
        "category": "Stances & Footwork",
        "content": [
          "Heel of front leg touches the floor",
          "Heel of supporting leg off the floor",
          "Knee and toes of supporting leg misaligned"
        ]
      },
      {
        "code": "53",
        "name": "Pū Bù",
        "english": "Crouching Stance",
        "category": "Stances & Footwork",
        "content": [
          "Squatting leg is not in full squat with the back of the thigh in contact with the calf",
          "The extended leg is not completely straight",
          "Extended leg’s foot is not hooked inwards with the sole completely flat on the ground"
        ]
      },
      {
        "code": "59",
        "name": "Shàng Bù",
        "english": "Advancing Step",
        "category": "Stances & Footwork",
        "content": [
          "Knee and toes of supporting leg misaligned",
          "Foot is dragged when stepping (excluding special techniques)",
          "Center of gravity rising and falling when stepping",
          "Foot is raised too high off the ground when stepping"
        ]
      },
      {
        "code": "59",
        "name": "Tuì Bù",
        "english": "Retreating Step",
        "category": "Stances & Footwork",
        "content": [
          "Knee and toes of supporting leg misaligned",
          "Foot is dragged when stepping (excluding special techniques)",
          "Center of gravity rising and falling when stepping",
          "Foot is raised too high off the ground when stepping"
        ]
      },
      {
        "code": "59",
        "name": "Jìn Bù",
        "english": "Forward Step",
        "category": "Stances & Footwork",
        "content": [
          "Knee and toes of supporting leg misaligned",
          "Foot is dragged when stepping (excluding special techniques)",
          "Center of gravity rising and falling when stepping",
          "Foot is raised too high off the ground when stepping"
        ]
      },
      {
        "code": "59",
        "name": "Gēn Bù",
        "english": "Follow-up Step",
        "category": "Stances & Footwork",
        "content": [
          "Knee and toes of supporting leg misaligned",
          "Foot is dragged when stepping (excluding special techniques)",
          "Center of gravity rising and falling when stepping",
          "Foot is raised too high off the ground when stepping"
        ]
      },
      {
        "code": "59",
        "name": "Cè Xíng Bù",
        "english": "Sideways Step",
        "category": "Stances & Footwork",
        "content": [
          "Knee and toes of supporting leg misaligned",
          "Foot is dragged when stepping (excluding special techniques)",
          "Center of gravity rising and falling when stepping",
          "Foot is raised too high off the ground when stepping"
        ]
      },
      {
        "code": "60",
        "name": "Guà Jiàn",
        "english": "Straight Sword Hooking Parry",
        "category": "Weapon Techniques",
        "content": [
          "Straight sword and forearm are aligned",
          "No obvious vertical circle formed"
        ]
      },
      {
        "code": "60",
        "name": "Liāo Jiàn",
        "english": "Straight Sword Uppercut",
        "category": "Weapon Techniques",
        "content": [
          "Straight sword and forearm are aligned",
          "No obvious vertical circle formed"
        ]
      },
      {
        "code": "61",
        "name": "Wò Jiàn",
        "english": "Gripping the Straight Sword",
        "category": "Weapon Techniques",
        "content": [
          "Any finger wraps around the top of the hand guard and touches the edge of the blade"
        ]
      },
      {
        "code": "68",
        "name": "Jiǎo Jiàn",
        "english": "Straight Sword Enveloping",
        "category": "Weapon Techniques",
        "content": [
          "Tip of the straight sword not travelling in a clearly-defined circle"
        ]
      },
      {
        "code": "70",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Torso sways (deduct 0.10)"
        ]
      },
      {
        "code": "70",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Foot shuffles or skips (deduct 0.10)"
        ]
      },
      {
        "code": "71",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Additional Support (deduct 0.20)"
        ]
      },
      {
        "code": "72",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Fall (deduct 0.30)"
        ]
      },
      {
        "code": "73",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon unintentionally makes contact with the floor (deduct 0.10)",
          "Loss of grip (deduct 0.10)",
          "Weapon strikes the body (deduct 0.10)",
          "Weapon deforms (deduct 0.10)"
        ]
      },
      {
        "code": "74",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon Broken (deduct 0.20)"
        ]
      },
      {
        "code": "75",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon dropped on the floor (deduct 0.30)"
        ]
      },
      {
        "code": "76",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Broad Sword Ribbon; Straight sword Tassel; Spear Tassel; Garment Item; Headwear dropped on the floor (deduct 0.10)",
          "Broad Sword Ribbon; Straight sword Tassel; Soft Weapon entangles hand or body (deduct 0.10)"
        ]
      },
      {
        "code": "77",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Balance technique not maintained for at least 2 seconds (deduct 0.10)"
        ]
      },
      {
        "code": "78",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Any part of competitors body touches floor outside carpet boundary line. (deduct 0.10)"
        ]
      },
      {
        "code": "79",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Forgetting (Movement Forgotten) (deduct 0.10)"
        ]
      },
      {
        "code": "80",
        "name": "",
        "english": "Content",
        "category": "Content",
        "content": [
          "For each missing compulsory/mandatory technique in optional routines (deduct 0.20)",
          "For each missing/additional technique in compulsory routines (deduct 0.20)",
          "For each instance of altering part of a technique (deduct 0.20)"
        ]
      },
      {
        "code": "81",
        "name": "",
        "english": "Content",
        "category": "Compulsory Routines",
        "content": [
          "Missing or additional step"
        ]
      },
      {
        "code": "82",
        "name": "",
        "english": "Content",
        "category": "Nanquan Type Compulsory Routines",
        "content": [
          "For each missing or additional vocalization (deduct 0.20)"
        ]
      },
      {
        "code": "83",
        "name": "",
        "english": "Structure & Composition",
        "category": "Obvious unmethodical pause",
        "content": [
          "A static state (excluding balance techniques) which is held for longer than 3 seconds; During a Taijiquan or Taijijian there is an unmethodical pause prior to the execution of Degree of Difficulty technique, etc."
        ]
      },
      {
        "code": "84",
        "name": "",
        "english": "Structure & Composition",
        "category": "Compulsory Routines",
        "content": [
          "For Changquan type and Nanquan Type events (including weapon routines), movements done in averted directions exceeding 45 degrees. For Taijiquan and Taijijian events, movements done in averted directions exceeding 90 degrees."
        ]
      },
      {
        "code": "85",
        "name": "",
        "english": "Music",
        "category": "Events Requiring Musical Accompaniment",
        "content": [
          "No music or music which includes vocals/lyrics (deduct 0.50)"
        ]
      }
    ]
  },
  {
    "id": "duilian",
    "title": "Duilian (Choreographed Sparring)",
    "events": [],
    "standards": [
      "For each technical error 0.10 will be deducted.",
      "Technical errors will be deducted as they occur in a cumulative manner.",
      "Sway: A sway is defined an athlete’s upper body is displaced (sways) in 2 different directions. For example, the athlete loses his center of balance and leans his or her upper body to maintain his balance, either left or right, forward and backwards, or inacircular motion ending upright, it is regarded as a sway.",
      "Shuffle: This refers to a situation when standing or landing on both feet or on a singlefoot or on one foot and one leg. Should any supporting foot move or be displaced laterally it is considered as a shuffle.",
      "Skip: This refers to a situation when standing or landing on both feet or on a single foot. Should any supporting foot leave the carpet in a skip or hop it is considered a skip.",
      "Additional Support: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of a hand, elbow, knee, non- supporting leg (during a single leg posture) or the weapon as an additional support it isconsidered as an additional support. (Note: should the weapon hit the floor during the course of a movement without any force applied to it as additional support it should be considered as a weapon hitting the body or floor and be deducted for accordingly).",
      "Fall: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of both hands, the head, the upper arm (above the elbow), shoulder, torso, buttocks; or should any two or more parts of the body simultaneously make contact with the floor, or one part of the body and the weapon (the weapon is considered an extension of the arm), it is considered as a fall. (Note: In Choreographed Sparring events, intentional falls to the ground are neither considered as nor deducted for as falls).",
      "Weapon-Touching-Body: Should an athlete during a technique with a weapon strike, tap or touch any part of his/her body, it will be considered as weapon-touching-body and be deducted accordingly.",
      "Weapon Deformed: This refers to when the weapon has been deformed to degree in excess of 45° from its original intended shape.",
      "Out-of-bounds: Should an athlete during his/her performance, touch the floor outsideof the boundary line of the competition arena with any part of his/her body, it is considered as out-of-bounds. Should the weapon touch the floor outside of the boundary line of the competition arena; or if any part of the performer’s body is extended beyond the boundary line of the competition arena but does not make contact with the floor it is not considered as out-of-bounds.",
      "Balance Technique Static/Motionless Timing: Calculation of time begins when the movement first stops in a static or motionless state. This applies to Changquan, Jianshu, Daoshu, Qiangshu & Gunshu events only.",
      "Forgetting: Should an athlete during his/her performance have a lapse of memory and be interrupted and pause unconventionally or have chaotic movements, it is considered as forgetting.",
      "Should during a single technique, more than one <other error> occur, they will be deducted in a cumulative manner",
      "Other Errors will be deducted as they occur in a cumulative manner."
    ],
    "codes": [
      {
        "code": "70",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Torso sways (deduct 0.10)"
        ]
      },
      {
        "code": "70",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Foot shuffles or skips (deduct 0.10)"
        ]
      },
      {
        "code": "71",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Additional Support (deduct 0.20)"
        ]
      },
      {
        "code": "72",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Fall (deduct 0.30)"
        ]
      },
      {
        "code": "73",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon unintentionally makes contact with the floor (deduct 0.10)",
          "Loss of grip (deduct 0.10)",
          "Weapon strikes the body (deduct 0.10)",
          "Weapon deforms (deduct 0.10)"
        ]
      },
      {
        "code": "74",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon Broken (deduct 0.20)"
        ]
      },
      {
        "code": "75",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon dropped on the floor (deduct 0.30)"
        ]
      },
      {
        "code": "76",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Broad Sword Ribbon; Straight sword Tassel; Spear Tassel; Garment Item; Headwear dropped on the floor (deduct 0.10)",
          "Broad Sword Ribbon; Straight sword Tassel; Soft Weapon entangles hand or body (deduct 0.10)"
        ]
      },
      {
        "code": "77",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Balance technique not maintained for at least 2 seconds (deduct 0.10)"
        ]
      },
      {
        "code": "78",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Any part of competitors body touches floor outside carpet boundary line. (deduct 0.10)"
        ]
      },
      {
        "code": "79",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Forgetting (Movement Forgotten) (deduct 0.10)"
        ]
      },
      {
        "code": "80",
        "name": "",
        "english": "Content",
        "category": "Content",
        "content": [
          "For each missing compulsory/mandatory technique in optional routines (deduct 0.20)",
          "For each missing/additional technique in compulsory routines (deduct 0.20)",
          "For each instance of altering part of a technique (deduct 0.20)"
        ]
      },
      {
        "code": "81",
        "name": "",
        "english": "Content",
        "category": "Compulsory Routines",
        "content": [
          "Missing or additional step"
        ]
      },
      {
        "code": "82",
        "name": "",
        "english": "Content",
        "category": "Nanquan Type Compulsory Routines",
        "content": [
          "For each missing or additional vocalization (deduct 0.20)"
        ]
      },
      {
        "code": "83",
        "name": "",
        "english": "Structure & Composition",
        "category": "Obvious unmethodical pause",
        "content": [
          "A static state (excluding balance techniques) which is held for longer than 3 seconds; During a Taijiquan or Taijijian there is an unmethodical pause prior to the execution of Degree of Difficulty technique, etc."
        ]
      },
      {
        "code": "84",
        "name": "",
        "english": "Structure & Composition",
        "category": "Compulsory Routines",
        "content": [
          "For Changquan type and Nanquan Type events (including weapon routines), movements done in averted directions exceeding 45 degrees. For Taijiquan and Taijijian events, movements done in averted directions exceeding 90 degrees."
        ]
      },
      {
        "code": "85",
        "name": "",
        "english": "Music",
        "category": "Events Requiring Musical Accompaniment",
        "content": [
          "No music or music which includes vocals/lyrics (deduct 0.50)"
        ]
      },
      {
        "code": "90",
        "name": "",
        "english": "Method",
        "category": "Method",
        "content": [
          "Attack Wide of or off target area"
        ]
      },
      {
        "code": "91",
        "name": "",
        "english": "Method",
        "category": "Method",
        "content": [
          "Motionless state held for more than 3 seconds"
        ]
      },
      {
        "code": "92",
        "name": "",
        "english": "Method",
        "category": "Method",
        "content": [
          "Duration without attack and defense exceeds 3 seconds"
        ]
      },
      {
        "code": "93",
        "name": "",
        "english": "Co-Operation",
        "category": "Co-Operation",
        "content": [
          "Misses in attack or defense"
        ]
      },
      {
        "code": "94",
        "name": "",
        "english": "Co-Operation",
        "category": "Co-Operation",
        "content": [
          "Waiting for partner’s attack technique"
        ]
      },
      {
        "code": "95",
        "name": "",
        "english": "Co-Operation",
        "category": "Co-Operation",
        "content": [
          "Miss hit on Partner/s"
        ]
      }
    ]
  },
  {
    "id": "jiti",
    "title": "Jiti (Group Routine)",
    "events": [],
    "standards": [
      "For each technical error 0.10 will be deducted.",
      "Technical errors will be deducted as they occur in a cumulative manner.",
      "Sway: A sway is defined an athlete’s upper body is displaced (sways) in 2 different directions. For example, the athlete loses his center of balance and leans his or her upper body to maintain his balance, either left or right, forward and backwards, or inacircular motion ending upright, it is regarded as a sway.",
      "Shuffle: This refers to a situation when standing or landing on both feet or on a singlefoot or on one foot and one leg. Should any supporting foot move or be displaced laterally it is considered as a shuffle.",
      "Skip: This refers to a situation when standing or landing on both feet or on a single foot. Should any supporting foot leave the carpet in a skip or hop it is considered a skip.",
      "Additional Support: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of a hand, elbow, knee, non- supporting leg (during a single leg posture) or the weapon as an additional support it isconsidered as an additional support. (Note: should the weapon hit the floor during the course of a movement without any force applied to it as additional support it should be considered as a weapon hitting the body or floor and be deducted for accordingly).",
      "Fall: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of both hands, the head, the upper arm (above the elbow), shoulder, torso, buttocks; or should any two or more parts of the body simultaneously make contact with the floor, or one part of the body and the weapon (the weapon is considered an extension of the arm), it is considered as a fall. (Note: In Choreographed Sparring events, intentional falls to the ground are neither considered as nor deducted for as falls).",
      "Weapon-Touching-Body: Should an athlete during a technique with a weapon strike, tap or touch any part of his/her body, it will be considered as weapon-touching-body and be deducted accordingly.",
      "Weapon Deformed: This refers to when the weapon has been deformed to degree in excess of 45° from its original intended shape.",
      "Out-of-bounds: Should an athlete during his/her performance, touch the floor outsideof the boundary line of the competition arena with any part of his/her body, it is considered as out-of-bounds. Should the weapon touch the floor outside of the boundary line of the competition arena; or if any part of the performer’s body is extended beyond the boundary line of the competition arena but does not make contact with the floor it is not considered as out-of-bounds.",
      "Balance Technique Static/Motionless Timing: Calculation of time begins when the movement first stops in a static or motionless state. This applies to Changquan, Jianshu, Daoshu, Qiangshu & Gunshu events only.",
      "Forgetting: Should an athlete during his/her performance have a lapse of memory and be interrupted and pause unconventionally or have chaotic movements, it is considered as forgetting.",
      "Should during a single technique, more than one <other error> occur, they will be deducted in a cumulative manner",
      "Other Errors will be deducted as they occur in a cumulative manner."
    ],
    "codes": [
      {
        "code": "70",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Torso sways (deduct 0.10)"
        ]
      },
      {
        "code": "70",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Foot shuffles or skips (deduct 0.10)"
        ]
      },
      {
        "code": "71",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Additional Support (deduct 0.20)"
        ]
      },
      {
        "code": "72",
        "name": "",
        "english": "Loss of Balance",
        "category": "Loss of Balance",
        "content": [
          "Fall (deduct 0.30)"
        ]
      },
      {
        "code": "73",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon unintentionally makes contact with the floor (deduct 0.10)",
          "Loss of grip (deduct 0.10)",
          "Weapon strikes the body (deduct 0.10)",
          "Weapon deforms (deduct 0.10)"
        ]
      },
      {
        "code": "74",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon Broken (deduct 0.20)"
        ]
      },
      {
        "code": "75",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Weapon dropped on the floor (deduct 0.30)"
        ]
      },
      {
        "code": "76",
        "name": "",
        "english": "Weapons & Apparel",
        "category": "Weapons & Apparel",
        "content": [
          "Broad Sword Ribbon; Straight sword Tassel; Spear Tassel; Garment Item; Headwear dropped on the floor (deduct 0.10)",
          "Broad Sword Ribbon; Straight sword Tassel; Soft Weapon entangles hand or body (deduct 0.10)"
        ]
      },
      {
        "code": "77",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Balance technique not maintained for at least 2 seconds (deduct 0.10)"
        ]
      },
      {
        "code": "78",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Any part of competitors body touches floor outside carpet boundary line. (deduct 0.10)"
        ]
      },
      {
        "code": "79",
        "name": "",
        "english": "Other",
        "category": "Other",
        "content": [
          "Forgetting (Movement Forgotten) (deduct 0.10)"
        ]
      },
      {
        "code": "80",
        "name": "",
        "english": "Content",
        "category": "Content",
        "content": [
          "For each missing compulsory/mandatory technique in optional routines (deduct 0.20)",
          "For each missing/additional technique in compulsory routines (deduct 0.20)",
          "For each instance of altering part of a technique (deduct 0.20)"
        ]
      },
      {
        "code": "81",
        "name": "",
        "english": "Content",
        "category": "Compulsory Routines",
        "content": [
          "Missing or additional step"
        ]
      },
      {
        "code": "82",
        "name": "",
        "english": "Content",
        "category": "Nanquan Type Compulsory Routines",
        "content": [
          "For each missing or additional vocalization (deduct 0.20)"
        ]
      },
      {
        "code": "83",
        "name": "",
        "english": "Structure & Composition",
        "category": "Obvious unmethodical pause",
        "content": [
          "A static state (excluding balance techniques) which is held for longer than 3 seconds; During a Taijiquan or Taijijian there is an unmethodical pause prior to the execution of Degree of Difficulty technique, etc."
        ]
      },
      {
        "code": "84",
        "name": "",
        "english": "Structure & Composition",
        "category": "Compulsory Routines",
        "content": [
          "For Changquan type and Nanquan Type events (including weapon routines), movements done in averted directions exceeding 45 degrees. For Taijiquan and Taijijian events, movements done in averted directions exceeding 90 degrees."
        ]
      },
      {
        "code": "85",
        "name": "",
        "english": "Music",
        "category": "Events Requiring Musical Accompaniment",
        "content": [
          "No music or music which includes vocals/lyrics (deduct 0.50)"
        ]
      },
      {
        "code": "90",
        "name": "",
        "english": "Method",
        "category": "Method",
        "content": [
          "Footwork/Stance, Leg Technique not meeting the requirements"
        ]
      },
      {
        "code": "91",
        "name": "",
        "english": "Method",
        "category": "Method",
        "content": [
          "Jumping technique, Tumbling Technique not meeting the requirements"
        ]
      },
      {
        "code": "92",
        "name": "",
        "english": "Method",
        "category": "Method",
        "content": [
          "Weapon Technique not meeting the requirements"
        ]
      },
      {
        "code": "93",
        "name": "",
        "english": "Co-Operation",
        "category": "Co-Operation",
        "content": [
          "Misses in attack or defense during sparring content"
        ]
      },
      {
        "code": "94",
        "name": "",
        "english": "Co-Operation",
        "category": "Co-Operation",
        "content": [
          "Waiting for partner’s attack technique during sparring content"
        ]
      },
      {
        "code": "95",
        "name": "",
        "english": "Co-Operation",
        "category": "Co-Operation",
        "content": [
          "Miss hit on Partner/s during sparring content"
        ]
      },
      {
        "code": "96",
        "name": "",
        "english": "Co-Operation",
        "category": "Co-Operation",
        "content": [
          "Single technique not executed uniformly"
        ]
      },
      {
        "code": "97",
        "name": "",
        "english": "Co-Operation",
        "category": "Co-Operation",
        "content": [
          "Group formation not uniform"
        ]
      }
    ]
  }
];
