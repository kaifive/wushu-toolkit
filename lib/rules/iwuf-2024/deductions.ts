import type { EventCode } from "@/lib/domain/types";
import type { RuleSource } from "../types";

/**
 * Deduction codes from the IWUF Wushu Taolu Competition Rules and Judging
 * Methods (2024): Tables 10-1-1 to 10-1-6 (Judging Group A) and 10-4-1
 * (choreography, Assistant Head Judge). Transcribed from the official PDF.
 */

export interface DeductionCode {
  code: string;
  /** Pinyin name(s), when the table gives them. */
  name: string;
  english: string;
  category: string;
  /** Each error this code covers. */
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
  revision: "2024",
  url: "https://www.iwuf.org/xhimg/soft/240912/WUSHU-TAOLU-COMPETITION-RULES-AND-JUDGING-METHODS-2024.pdf",
  verified: true,
  notes: ["Tables 10-1-1 to 10-1-6 and 10-4-1."],
};

const d = (code: string, category: string, name: string, english: string, content: string[]): DeductionCode => ({ code, category, name, english, content });

/** Table 10-1-6 (other errors) and Table 10-4-1 (choreography): shared by every event family. */
const OTHER: DeductionCode[] = [
  d("70A", "Loss of Balance", "", "Torso sways", ["Torso sways (deduct 0.05)"]),
  d("70B", "Loss of Balance", "", "Foot shuffles or skips", ["Foot shuffles or skips (deduct 0.1)"]),
  d("71", "Loss of Balance", "", "Additional support", ["Additional support (deduct 0.2)"]),
  d("72", "Loss of Balance", "", "Fall", ["Fall (deduct 0.3)"]),
  d("73", "Weapons & Apparel", "", "Weapon contact, grip or deformation", [
    "Weapon unintentionally makes contact with the floor (deduct 0.1)",
    "Loss of grip (deduct 0.1)",
    "Weapon strikes the body (deduct 0.1)",
    "Weapon deforms (deduct 0.1)",
    "Fan surface is detached from the fan's ribs (deduct 0.1)",
  ]),
  d("74", "Weapons & Apparel", "", "Weapon broken", ["Weapon broken (deduct 0.2)", "Main or minor ribs of the fan break, or nails on the ribs fall off (deduct 0.2)"]),
  d("75", "Weapons & Apparel", "", "Weapon dropped", ["Weapon dropped on the floor (deduct 0.3)"]),
  d("76", "Weapons & Apparel", "", "Ribbon, tassel, garment or shoes", [
    "Broadsword ribbon, straight sword tassel, spear tassel, garment item or headwear dropped on the floor (deduct 0.1)",
    "Broadsword ribbon, straight sword tassel or soft weapon entangles the hand or body (deduct 0.1)",
    "Costume torn or button opened up (deduct 0.1)",
    "Shoes dropped off (deduct 0.1)",
  ]),
  d("77", "Other", "", "Balance timing", [
    "Balance technique not completed rhythmically and quickly according to the characteristics of the event (deduct 0.1)",
    "Balance technique not maintained for at least 2 seconds (deduct 0.1)",
  ]),
  d("78", "Other", "", "Out of bounds", ["Out of bounds (deduct 0.1)"]),
  d("79", "Other", "", "Forgetting", ["Forgetting (movement forgotten) (deduct 0.1)"]),
  d("80", "Choreography", "", "Compulsory/mandatory technique", [
    "Optional routines: each missing or altered compulsory/mandatory technique (deduct 0.2)",
    "Compulsory routines: each missing, additional or altered technique (deduct 0.2)",
  ]),
  d("81", "Choreography", "", "Steps (compulsory routines)", ["Missing or additional step (deduct 0.1)"]),
  d("82", "Choreography", "", "Vocalization (Nanquan compulsory)", ["Each missing or additional vocalization, or not vocalizing as required (deduct 0.2)"]),
  d("83", "Choreography", "", "Pauses and rhythm", [
    "A static state (excluding balance techniques) held for longer than 2 seconds (deduct 0.1)",
    "Taijiquan or Taijijian: an obvious unmethodical pause before a difficulty technique (deduct 0.1)",
    "Non-offensive or non-defensive actions that disrupt the rhythm before a difficulty technique (deduct 0.1)",
  ]),
  d("84", "Choreography", "", "Direction (compulsory routines)", [
    "Changquan and Nanquan types (including weapons): movements averted more than 90° (deduct 0.1)",
    "Taijiquan and Taijijian: movements averted more than 45° (deduct 0.1)",
  ]),
  d("85", "Choreography", "", "Between difficulty groups", ["Fewer than 2 complete technique movements between 2 groups of difficulty techniques (deduct 0.1)"]),
  d("86", "Music", "", "Music", ["Events requiring music: no music, or music with vocals/lyrics (deduct 0.5)"]),
];

const DEFINITIONS = [
  "Sway: the upper body is displaced in 2 different directions, e.g. the athlete loses balance and leans left/right, forward/back or in a circle before ending upright.",
  "Shuffle: standing or landing on both feet, one foot, or one foot and one leg, any supporting foot moves or is displaced laterally.",
  "Skip: standing or landing on both feet or one foot, any supporting foot leaves the carpet in a skip or hop.",
  "Additional support: losing balance and using a hand, elbow, knee, non-supporting leg (in a single-leg posture) or the weapon for support. A weapon touching the floor with no supporting force counts as the weapon touching the floor.",
  "Fall: losing balance so both hands, the head, upper arm, shoulder, torso or buttocks touch the floor; or any two or more body parts at once; or one body part and the weapon. Intentional falls in duilian are not falls.",
  "Weapon touching body: the weapon strikes, taps or touches the body, except techniques where contact is intended.",
  "Weapon deformed: bent more than 45° from its original shape.",
  "Out of bounds: any part of the body touches the floor outside the boundary line. A weapon touching outside, or the body extending beyond the line without touching, is not out of bounds.",
  "Balance timing starts when the movement first becomes motionless (Changquan, Jianshu, Daoshu, Qiangshu and Gunshu only).",
  "Forgetting: a lapse of memory causing an unconventional pause, interruption or chaotic movements.",
  "Several other errors in one technique are deducted cumulatively, each time they occur.",
];

export const DEDUCTION_GROUPS: DeductionGroup[] = [
  {
    id: "northern",
    title: "Changquan, Jianshu, Daoshu, Qiangshu & Gunshu",
    events: ["CQ", "JS", "DS", "QS", "GS"],
    standards: [
      "Within a single technique, 1 or more errors: 0.1 is deducted once.",
      "Within a single group of movements, 2 or more of the same weapon technique error: 0.1 is deducted once.",
      "No obvious vertical/horizontal circle: the sword, cudgel or spear tip rotates 45° or more off the vertical/horizontal plane.",
      ...DEFINITIONS,
    ],
    codes: [
    d("01", "Hand Forms/Shapes", "Quán", "Fist", ["Face of fist uneven", "The thumb is not pressing on the second segment of both the index and middle fingers"]),
    d("02", "Hand Forms/Shapes", "Zhǎng", "Palm", ["Four fingers not straight and held together", "Thumb is not bent and held in tightly"]),
    d("03", "Hand Forms/Shapes", "Gōu Shǒu", "Hook", ["The five fingers are not pinched together", "Wrist not hooked completely"]),
    d("04", "Hand Forms/Shapes", "Jiàn Zhǐ", "Sword Fingers", ["Index finger and middle finger not kept straight and together", "Thumb not pressing on the ring finger and little finger"]),
    d("10", "Balance Techniques", "Bān Jiǎo Cháo Tiān Zhí Lì / Cè Tī Bào Jiǎo Zhí Lì", "Standing vertical leg hold / Side kick catching the foot", ["Supporting leg bent", "Raised leg bent"]),
    d("12", "Balance Techniques", "Yǎng Shēn Píng Héng", "Backward Leaning Balance", ["The raised leg is held below horizontal level"]),
    d("13", "Balance Techniques", "Shí Zì Píng Héng", "Forward Leaning Balance with Arms Outspread", ["Supporting leg bent", "The torso is below horizontal level"]),
    d("14", "Balance Techniques", "Kòu Tuǐ Píng Héng / Pán Tuǐ Píng Héng", "Rear Cross-legged Balance / Front Cross-legged Balance", ["Thigh of supporting leg is not at horizontal level"]),
    d("15", "Balance Techniques", "Cè Shēn Píng Héng / Tàn Hǎi Píng Héng", "Sideways Leaning Balance / Exploring the Ocean Balance", ["Supporting leg bent", "Raised leg bent"]),
    d("16", "Balance Techniques", "Wàng Yuè Píng Héng", "Gazing at the Moon Balance", ["Torso held 45° or more above horizontal level", "Waist not twisted toward the rear in the direction of the supporting leg", "Instep of the raised bent leg not extended flat"]),
    d("20", "Leg Techniques", "Qián Sǎo Tuǐ", "Front Sweep", ["The thigh of supporting leg is above horizontal level", "The sole of sweeping foot leaves the ground after making contact for the sweeping action", "Sweeping leg bent 45° or more"]),
    d("21", "Leg Techniques", "Hòu Sǎo Tuǐ", "Back Sweep", ["The sole of sweeping foot leaves the ground after making contact for the sweeping action", "Sweeping leg bent 45° or more"]),
    d("22", "Leg Techniques", "Diē Shù Chà", "Falling Front Split", ["The sole of the front foot turns inward and touches the ground", "Front and rear legs did not form two parallel straight lines"]),
    d("23", "Leg Techniques", "Tán Tuǐ / Dēng Tuǐ / Chuài Tuǐ", "Snap Kick / Heel Push Kick / Side Kick", ["The kicking leg does not transit from obvious bent (45° or more) to completely straight"]),
    d("24", "Leg Techniques", "Zhèng Tī Tuǐ / Cè Tī Tuǐ", "Front Stretch Kick / Side Stretch Kick", ["Knee/s bent at the apex of the kick", "Heel of supporting leg off the floor"]),
    d("25", "Leg Techniques", "Lǐ Hé Pāi Jiǎo / Bǎi Lián Pāi Jiǎo / Dān Pāi Jiǎo", "Inward Slap Kick / Lotus Slap Kick / Front Slap Kick", ["Toes of slapped foot not above shoulder height", "Slap missed and/or inaudible"]),
    d("26", "Leg Techniques", "Tí Xī Dú Lì", "Single Knee Raised Position", ["Raised knee not above waist level", "Raised shank/calf of the leg is not turning obliquely inwards", "Raised foot's toes not pointed and hooking inwards"]),
    d("30", "Jumping Techniques", "Téng Kōng Fēi Jiǎo / Xié Fēi Jiǎo / Shuāng Fēi Jiǎo / Xuàn Fēng Jiǎo / Téng Kōng Bǎi Lián", "Jumping Front Slap / Slant / Double Front Slap Kick, Tornado Kick, Jumping Lotus Kick", ["Toes of slapped foot not above shoulder level", "Slap missed and/or inaudible"]),
    d("31", "Jumping Techniques", "Téng Kōng Zhèng Tī Tuǐ", "Jumping Front Straight Kick", ["The hanging leg is bent at the moment the toes of the kicking leg touch the forehead or above the forehead", "The angle between the torso and the hanging leg is less than 135° the moment the toes of the kicking leg touch the forehead or above"]),
    d("32", "Jumping Techniques", "Cè Kōng Fān / Cè Kōng Fān Zhuǎn Tǐ", "Aerial Cartwheel / Aerial Cartwheel Twist", ["Leg/s bent 45° or more while in the air"]),
    d("33", "Jumping Techniques", "Xuàn Zǐ / Xuàn Zǐ Zhuǎn Tǐ", "Butterfly Kick / Butterfly Twist", ["Leg/s obviously bent 45° or more while in the air", "Angle of the torso is 45° or more above horizontal level during the twist"]),
    d("34", "Jumping Techniques", "Téng Kōng Jiàn Tán / Téng Kōng Dēng Tuǐ", "Jumping Snap Kick / Jumping Heel Push Kick", ["Snap/spring (pushing) leg does not transit from an obvious bent (45° or more) to completely straight", "Snap/spring (pushing) leg below horizontal level"]),
    d("50", "Stances", "Gōng Bù", "Bow Stance", ["The knee of the front leg is not above the instep", "The thigh of the bending (front) leg is not parallel to the ground", "Any portion of the sole of the rear leg obviously off the floor", "The rear foot is not hooked inwards with the toes pointing obliquely forwards"]),
    d("51", "Stances", "Mǎ Bù", "Horse Stance", ["Thighs not horizontal", "The distance between the inner portions of the two feet is narrower than the performer's shoulder width", "Knee/s buckling inwards", "The heel/s raised off the ground", "Toes of foot/feet pointing outward 45° or more"]),
    d("52", "Stances", "Xū Bù", "Empty Stance", ["Thigh of squatting leg is not parallel to the ground", "The heel of supporting foot is raised off the ground"]),
    d("53", "Stances", "Pū Bù", "Crouching Stance", ["The back of the thigh of the squatting leg is not in contact with the calf", "The extended leg is not completely straight", "Extended leg's foot is not turned inwards with the sole completely flat on the ground"]),
    d("54", "Stances", "Xiē Bù", "Cross-Legged Crouching Stance", ["The two thighs are not crossed and closed together", "The buttocks are not in contact with the calf of the sitting leg"]),
    d("58", "Stances", "Zuò Pán", "Cross-Legged Sitting", ["Neither one of the buttocks is in contact with the floor", "Either one of the feet is not in contact with the floor"]),
    d("60", "Weapon Techniques", "Guà Jiàn / Liāo Jiàn", "Straight Sword Hooking Parry / Uppercut", ["Straight sword and forearm/wrist are aligned", "No obvious vertical circle formed"]),
    d("61", "Weapon Techniques", "Wò Jiàn", "Gripping the Straight Sword", ["Any finger wraps around the top of the hand guard and touches the edge of the blade"]),
    d("62", "Weapon Techniques", "Chán Tóu / Guǒ Nǎo", "Broadsword Twining / Wrapping", ["The back of the broadsword blade is not kept close to the body when wrapping or twining"]),
    d("63", "Weapon Techniques", "Lán Qiāng / Ná Qiāng / Zhā Qiāng", "Spear Outward Blocking / Inward Blocking / Thrust", ["Spear head not travelling in a clearly defined arc", "Rear handle of spear end protruding from grip (extending past rear grip)", "The thrusting arm and the spear shaft do not form a straight line horizontally"]),
    d("64", "Weapon Techniques", "Píng Lūn Gùn", "Horizontal Cudgel Windmill Waving with One Hand", ["No obvious horizontal circle formed"]),
    d("65", "Weapon Techniques", "Lì Wǔ Huā Qiāng / Lì Wǔ Huā Gùn / Shuāng Shǒu Tí Liāo Huā Gùn", "Vertical Figure 8 with the Spear / Cudgel; Vertical Uppercutting Cudgel with Both Hands", ["The spear/cudgel does not rotate in an obvious vertical plane"]),
    d("66", "Weapon Techniques", "Qì Xiè Pāo Jiē", "Weapon Throwing & Catching", ["Weapon caught in a hugging manner", "Failure to catch the straight sword/broadsword by the handle, or the cudgel/spear shaft, with a single hand"]),
      ...OTHER,
    ],
  },
  {
    id: "southern",
    title: "Nanquan, Nandao & Nangun",
    events: ["NQ", "ND", "NG"],
    standards: [
      "Within a single technique, 1 or more errors: 0.1 is deducted once.",
      "Within a single group of movements, 2 or more of the same weapon technique error: 0.1 is deducted once.",
      ...DEFINITIONS,
    ],
    codes: [
      d("01", "Hand Forms/Shapes", "Quán", "Fist", ["Face of fist uneven", "The thumb is not pressing on the second segment of both the index and middle fingers"]),
      d("02", "Hand Forms/Shapes", "Hǔ Zhǎo", "Tiger's Claw", ["Five fingers not separated with the first and second segment of each finger hooked and flexed", "Center of the palm not pushed out"]),
      d("03", "Hand Forms/Shapes", "Hè Zuǐ", "Crane's Beak", ["Five fingers not pinched together", "Wrist flexed (bent) when striking"]),
      d("04", "Hand Forms/Shapes", "Dān Zhǐ Zhǎng", "Single Finger Palm", ["Index finger not straight", "The other 4 fingers not tightly bent/hooked"]),
      d("20", "Leg Techniques", "Qián Sǎo Tuǐ", "Front Sweep", ["The thigh of supporting leg is above horizontal level", "The sole of sweeping foot leaves the ground after making contact for the sweeping action", "Sweeping leg bent 45° or more"]),
      d("23", "Leg Techniques", "Héng Cǎi Tuǐ / Dēng Tuǐ / Hǔ Wěi Tuǐ", "Horizontal Stamping Kick / Heel Push Kick / Tiger Tail Kick", ["The kicking leg does not transit from an obvious bent (45° or more) to completely straight"]),
      d("25", "Leg Techniques", "Zhuǎn Shēn Hòu Bǎi Tuǐ", "Turning Back Crescent Kick", ["Kicking leg bent", "Toes of the kicking leg not above waist level"]),
      d("26", "Leg Techniques", "Tí Xī Dú Lì", "Single Knee Raised Position", ["Raised knee not above waist level", "Raised shank/calf of the leg is not turning obliquely inwards", "Raised foot's toes not pointed and hooking inwards"]),
      d("27", "Leg Techniques", "Héng Dìng Tuǐ", "Horizontal Nail Kick", ["The kicking leg does not transit from bent (less than 45°) to completely straight", "The kicking leg does not travel horizontally across to the opposite side of the body", "The toes of the kicking foot are not flexed inwards"]),
      d("30", "Jumping Techniques", "Téng Kōng Fēi Jiǎo / Xuàn Fēng Jiǎo / Téng Kōng Wài Bǎi Tuǐ", "Jumping Front Slap Kick / Tornado Kick / Jumping Outer Crescent Kick", ["Toes of the slapped foot or kicked leg not above shoulder level", "Slap missed and/or inaudible (the slap is optional in Téng Kōng Wài Bǎi Tuǐ)"]),
      d("32", "Jumping Techniques", "Cè Kōng Fān", "Aerial Cartwheel", ["Leg/s bent 45° or more while in the air"]),
      d("40", "Tumbling Techniques", "Téng Kōng Pán Tuǐ 360° Cè Pū", "Flying Cross-Legged Kick 360° to Landing on Side", ["Toes of the kicking leg not above head level"]),
      d("42", "Tumbling Techniques", "Téng Kōng Shuāng Cè Chuài", "Jumping Double Side Kick", ["The legs are not held close together and/or are obviously bent when kicked out"]),
      d("50", "Stances", "Gōng Bù", "Bow Stance", ["The thigh of the bending (front) leg is not held between horizontal and 45° (excluding 45°) above horizontal", "The rear foot is not hooked inwards with the toes pointing obliquely forwards", "Any portion of the sole of the rear leg obviously off the floor"]),
      d("51", "Stances", "Mǎ Bù", "Horse Stance", ["The thigh/s not held between horizontal and 45° (excluding 45°) above horizontal", "The distance between the inner portions of the two feet is narrower than the performer's shoulder width", "Knee/s buckling inwards", "Heel/s raised off the ground"]),
      d("52", "Stances", "Xū Bù", "Empty Stance", ["The thigh of the supporting leg is not held between horizontal and 45° (excluding 45°) above horizontal", "The heel of supporting foot is raised off the ground"]),
      d("53", "Stances", "Pū Bù", "Crouching Stance", ["The back of the thigh of the squatting leg is not in contact with the calf", "The extended leg is not completely straight", "Extended leg's foot is not turned inwards with the sole completely flat on the ground"]),
      d("55", "Stances", "Dié Bù", "Butterfly Stance", ["The inner part of the shank/calf of the splayed leg/s is not fully in contact with the ground", "The inner part of the ankle/heel of the splayed leg/s is not fully in contact with the ground"]),
      d("56", "Stances", "Guì Bù", "Single Kneeling Stance", ["The knee of the lower kneeling leg touches the ground", "The buttock does not sit fully on the shank/calf of the lower kneeling leg"]),
      d("57", "Stances", "Qí Lóng Bù", "Dragon Riding Stance", ["The thigh of the front leg is not held between horizontal and 45° (excluding 45°) above horizontal", "The knee of the back leg makes contact with the ground"]),
      d("62", "Weapon Techniques", "Chán Tóu / Guǒ Nǎo", "Broadsword Twining / Wrapping", ["The back of the broadsword blade is not kept close to the body when wrapping or twining"]),
      d("67", "Weapon Techniques", "Dǐng Gùn", "Cudgel Handle Planting", ["The end of the cudgel handle is not planted firmly on the ground", "The tip of the cudgel is below the athlete's head level"]),
      ...OTHER,
    ],
  },
  {
    id: "taichi",
    title: "Taijiquan, Taijijian & Taijishan",
    events: ["TQ", "TJ", "TS"],
    standards: [
      "Within a single technique, 1 or more errors: 0.1 is deducted once.",
      "Within a single group of movements, 2 or more of the same weapon technique, footwork or stance error: 0.1 is deducted once. A group means the same position, hand, leg, footwork or weapon technique executed once, twice or more in a sequence.",
      "Quán, Zhǎng, Jiàn Zhǐ, body posture and hand techniques: deducted each time, up to 0.3 per technique per routine.",
      "Knee and toes of supporting leg misaligned: the knee tip is drawn in past the vertical line of the medial portion of the supporting foot when stepping.",
      ...DEFINITIONS,
    ],
    codes: [
      d("01", "Hand Forms, Techniques & Body Posture", "Quán", "Fist", ["Face of fist uneven", "The thumb is not pressing on the second segment of both the index and middle fingers"]),
      d("02", "Hand Forms, Techniques & Body Posture", "Zhǎng", "Palm", ["Four fingers not separated (excluding special techniques)", "The fingers are straightened", "Tiger's mouth not rounded (excluding special techniques)", "The center of the palm not drawn in and rounded (excluding special techniques)"]),
      d("04", "Hand Forms, Techniques & Body Posture", "Jiàn Zhǐ", "Sword Fingers", ["Index finger and middle finger not kept straight and together", "Thumb not pressing on the ring finger and little finger"]),
      d("05", "Hand Forms, Techniques & Body Posture", "Shǒu Fǎ", "Hand Techniques", ["Elbow lifted", "Arm straightened", "Armpit closed"]),
      d("06", "Hand Forms, Techniques & Body Posture", "Shēn Xíng", "Body Posture", ["Head and body not aligned", "Shoulders hunched, rounded lower back, buttocks sticking out", "Shoulders shrugged", "Waist twisted"]),
      d("17", "Balance Techniques", "Dīshì Qián Dēng Cǎi Jiǎo Píng Héng", "Forward Sole Kick with Low Step Balance", ["The heel of the supporting leg is raised", "Kicking leg bent at knee", "The foot of the kicking leg is not turned outwards"]),
      d("18", "Balance Techniques", "Qián Jǔ Tuǐ Dī Shì Píng Héng", "Low Balance with Leg Stretched Forward", ["Forward stretched leg bends and/or drops below horizontal at any point from standing to squatting"]),
      d("19", "Balance Techniques", "Hòu Chā Tuǐ Dī Shì Píng Héng", "Low Balance with Leg Crossed Behind", ["The foot of the leg crossed behind the supporting leg touches the ground"]),
      d("22", "Leg Techniques", "Diē Chà", "Hurdler's Split Position", ["Front foot turns in and touches the ground", "Angle between the two legs is 45° or less"]),
      d("23", "Leg Techniques", "Fēn Jiǎo / Dēng Jiǎo", "Parting Kick / Heel Kick", ["The raised leg is below horizontal level", "The raised leg is bent"]),
      d("25", "Leg Techniques", "Bǎi Lián Pāi Jiǎo / Dān Pāi Jiǎo", "Lotus Slap Kick / Front Slap Kick", ["Kicking leg bent when slapped", "Slap missed and/or inaudible"]),
      d("26", "Leg Techniques", "Tí Xī Dú Lì", "Single Knee Raised Position", ["Raised knee not above waist level"]),
      d("30", "Jumping Techniques", "Téng Kōng Fēi Jiǎo / Xuàn Fēng Jiǎo / Téng Kōng Bǎi Lián", "Jumping Front Slap Kick / Tornado Kick / Jumping Lotus Kick", ["Toes of the slapped foot not above shoulder level", "Slap missed and/or inaudible"]),
      d("31", "Jumping Techniques", "Téng Kōng Zhèng Tī Tuǐ", "Jumping Front Straight Kick", ["The hanging leg is bent at the moment the toes of the kicking leg touch the forehead or above", "The angle between the torso and the hanging leg is less than 135° the moment the toes of the kicking leg touch the forehead or above"]),
      d("50", "Stances & Footwork", "Gōng Bù", "Bow Stance", ["Knee of front leg is not above the instep or is in front of the toes", "The thigh of the bending (front) leg is not held between horizontal and 45° (excluding 45°) above horizontal", "Any portion of the sole of the rear leg obviously off the floor", "The rear foot is not hooked inwards with the toes pointing obliquely forwards", "Obvious bending of the back leg"]),
      d("51", "Stances & Footwork", "Mǎ Bù", "Horse Stance", ["The thigh/s are not held between horizontal and 45° (excluding 45°) above horizontal", "Knee/s collapsed inwards past the medial portion of the foot/feet"]),
      d("52", "Stances & Footwork", "Xū Bù", "Empty Stance", ["Heel of front leg touches the floor", "Knee and toes of supporting leg misaligned"]),
      d("53", "Stances & Footwork", "Pū Bù", "Crouching Stance", ["Squatting leg is not in full squat with the back of the thigh in contact with the calf", "The extended leg is not completely straight", "Extended leg's foot is not hooked inwards with the sole completely flat on the ground"]),
      d("59", "Stances & Footwork", "Shàng Bù / Tuì Bù / Jìn Bù / Gēn Bù / Cè Xíng Bù", "Advancing / Retreating / Forward / Follow-up / Sideways Step", ["Knee and toes of supporting leg misaligned", "Foot is dragged when stepping (excluding special techniques)", "Center of gravity fluctuating up and down when stepping", "Toes of the raised foot above the ankle of the other leg when advancing"]),
      d("60", "Weapon Techniques", "Guà Jiàn / Liāo Jiàn / Guà Shàn / Liāo Shàn", "Sword / Fan Hooking Parry and Uppercut", ["Straight sword/fan and forearm are aligned", "No obvious vertical circle formed"]),
      d("61", "Weapon Techniques", "Wò Jiàn / Kāi Shàn / Hé Shàn", "Gripping the Straight Sword / Fan Opening / Fan Closing", ["Any finger wraps around the top of the hand guard and touches the edge of the blade", "When opening the fan, the hand is not holding the bottom of the ribs, the fan is not fully opened (less than 180°), or the major ribs are not aligned with the arm", "The two major ribs are not closed together when the fan is fully collapsed"]),
      d("63", "Weapon Techniques", "Cì Shàn / Pī Shàn", "Fan Thrust / Fan Chop", ["Arm and fan are not aligned"]),
      d("66", "Weapon Techniques", "Pāo Jiē Shàn", "Fan Toss/Throw & Catch", ["Failure to catch the fan by the bottom/handle with a single hand"]),
      d("68", "Weapon Techniques", "Jiǎo Jiàn", "Straight Sword Enveloping", ["Tip of the straight sword not travelling in a clearly defined vertical circle"]),
      d("69", "Weapon Techniques", "Diǎn Shàn", "Fan Pointing", ["No obvious wrist lift"]),
      ...OTHER,
    ],
  },
  {
    id: "duilian",
    title: "Duilian (Choreographed Sparring)",
    events: [],
    standards: ["Each technical error: 0.1 deducted.", "Technical errors are deducted cumulatively as they occur.", ...DEFINITIONS],
    codes: [
      d("90", "Method", "", "Attack off target", ["Attack goes wide or off target area"]),
      d("91", "Method", "", "Motionless too long", ["Motionless state held for more than 3 seconds"]),
      d("92", "Method", "", "No attack or defense", ["Duration without attack and defense exceeds 3 seconds"]),
      d("93", "Co-Operation", "", "Missed attack or defense", ["Misses in attack or defense"]),
      d("94", "Co-Operation", "", "Waiting", ["Waiting for partner to attack"]),
      d("95", "Co-Operation", "", "Mishit", ["Mishit on partner/s"]),
      ...OTHER,
    ],
  },
  {
    id: "jiti",
    title: "Jiti (Group Routine)",
    events: [],
    standards: ["Each technical error: 0.1 deducted.", "Technical errors are deducted cumulatively as they occur.", ...DEFINITIONS],
    codes: [
      d("90", "Method", "", "Footwork, stance or leg technique", ["Footwork/stance or leg technique not meeting the requirements"]),
      d("91", "Method", "", "Jumping or tumbling", ["Jumping or tumbling technique not meeting the requirements"]),
      d("92", "Method", "", "Weapon technique", ["Weapon technique not meeting the requirements"]),
      d("93", "Co-Operation", "", "Missed attack or defense", ["Misses in attack or defense during sparring content"]),
      d("94", "Co-Operation", "", "Waiting", ["Waiting for partner to attack during sparring content"]),
      d("95", "Co-Operation", "", "Mishit", ["Mishit on partner/s during sparring content"]),
      d("96", "Co-Operation", "", "Not uniform", ["Single technique not executed uniformly"]),
      d("97", "Co-Operation", "", "Formation", ["Group formation not uniform"]),
      ...OTHER,
    ],
  },
];
