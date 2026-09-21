import { Question, MathCategory, MathLevel } from '../../shared/types.ts';

// Helper random functions
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

// Curated questions repository - Thân thiện, vui vẻ, dễ tiếp cận, tính nhẩm nhanh
export const CURATED_QUESTIONS: Question[] = [
  // ==========================================
  // NGUYEN_TO (Số nguyên tố)
  // ==========================================
  {
    id: 'NT_CB_01',
    question: 'Số nguyên tố chẵn duy nhất trong toán học là số nào?',
    formula: 'p \\in \\mathbb{P}, \\; p \\; \\text{chẵn}',
    options: ['2', '4', '6', '0'],
    answer: '2',
    explanation: 'Số 2 là số nguyên tố chẵn duy nhất vì các số chẵn lớn hơn 2 đều chia hết cho 2 (hợp số).',
    timeLimit: 50,
    difficulty: 1,
    category: 'NGUYEN_TO',
    level: 'CO_BAN',
  },
  {
    id: 'NT_CB_02',
    question: 'Số nào sau đây là số nguyên tố?',
    formula: 'n \\in \\mathbb{P}',
    options: ['4', '6', '7', '9'],
    answer: '7',
    explanation: 'Số 7 chỉ có đúng 2 ước là 1 và chính nó. Còn 4=2×2, 6=2×3, 9=3×3 là các hợp số.',
    timeLimit: 50,
    difficulty: 1,
    category: 'NGUYEN_TO',
    level: 'CO_BAN',
  },
  {
    id: 'NT_CB_03',
    question: 'Số 1 có phải là số nguyên tố không?',
    formula: '1 \\in \\mathbb{P} \\; ?',
    options: ['Không', 'Có', 'Tùy trường hợp', 'Không xác định'],
    answer: 'Không',
    explanation: 'Số nguyên tố là số tự nhiên lớn hơn 1 và chỉ có hai ước dương phân biệt (1 và chính nó). Do đó số 1 không phải là số nguyên tố.',
    timeLimit: 50,
    difficulty: 1,
    category: 'NGUYEN_TO',
    level: 'CO_BAN',
  },
  {
    id: 'NT_CB_04',
    question: 'Tổng của hai số nguyên tố đầu tiên (2 + 3) bằng bao nhiêu?',
    formula: '2 + 3 = ?',
    options: ['4', '5', '6', '7'],
    answer: '5',
    explanation: 'Hai số nguyên tố đầu tiên là 2 và 3. Tổng 2 + 3 = 5 (cũng là một số nguyên tố!).',
    timeLimit: 50,
    difficulty: 1,
    category: 'NGUYEN_TO',
    level: 'CO_BAN',
  },
  {
    id: 'NT_CB_05',
    question: 'Trong các số sau, số nào là số nguyên tố?',
    formula: 'n \\in \\mathbb{P} \\; (10 < n < 20)',
    options: ['11', '12', '14', '15'],
    answer: '11',
    explanation: '11 chỉ chia hết cho 1 và 11. Các số 12, 14, 15 đều chia hết cho các ước khác.',
    timeLimit: 50,
    difficulty: 1,
    category: 'NGUYEN_TO',
    level: 'CO_BAN',
  },

  // ==========================================
  // CHINH_PHUONG (Số chính phương)
  // ==========================================
  {
    id: 'CP_CB_01',
    question: 'Giá trị của 5² (5 nhân 5) bằng bao nhiêu?',
    formula: '5^2 = 5 \\times 5 = ?',
    options: ['10', '20', '25', '30'],
    answer: '25',
    explanation: '5 bình phương là 5 × 5 = 25.',
    timeLimit: 50,
    difficulty: 1,
    category: 'CHINH_PHUONG',
    level: 'CO_BAN',
  },
  {
    id: 'CP_CB_02',
    question: 'Căn bậc hai của 36 (√36) bằng bao nhiêu?',
    formula: '\\sqrt{36} = ?',
    options: ['4', '5', '6', '8'],
    answer: '6',
    explanation: 'Vì 6² = 36 nên căn bậc hai số học của 36 là 6.',
    timeLimit: 50,
    difficulty: 1,
    category: 'CHINH_PHUONG',
    level: 'CO_BAN',
  },
  {
    id: 'CP_CB_03',
    question: 'Số nào sau đây là một số chính phương?',
    formula: 'k^2 \\in \\{12, 14, 16, 18\\}',
    options: ['12', '14', '16', '18'],
    answer: '16',
    explanation: '16 = 4² = 4 × 4. Các số còn lại không phải là bình phương của số nguyên nào.',
    timeLimit: 50,
    difficulty: 1,
    category: 'CHINH_PHUONG',
    level: 'CO_BAN',
  },
  {
    id: 'CP_CB_04',
    question: 'Giá trị của 10² bằng bao nhiêu?',
    formula: '10^2 = ?',
    options: ['20', '50', '100', '1000'],
    answer: '100',
    explanation: '10² = 10 × 10 = 100.',
    timeLimit: 50,
    difficulty: 1,
    category: 'CHINH_PHUONG',
    level: 'CO_BAN',
  },
  {
    id: 'CP_CB_05',
    question: 'Số chính phương liền sau của 9 (3²) là số nào?',
    formula: '3^2 = 9 \\implies 4^2 = ?',
    options: ['12', '15', '16', '25'],
    answer: '16',
    explanation: 'Số chính phương liền sau 3² là 4² = 16.',
    timeLimit: 50,
    difficulty: 1,
    category: 'CHINH_PHUONG',
    level: 'CO_BAN',
  },

  // ==========================================
  // DAI_SO (Đại số & Tìm x đơn giản)
  // ==========================================
  {
    id: 'DS_CB_01',
    question: 'Tìm x biết: x + 12 = 30',
    formula: 'x + 12 = 30 \\implies x = ?',
    options: ['16', '18', '20', '22'],
    answer: '18',
    explanation: 'x = 30 - 12 = 18.',
    timeLimit: 50,
    difficulty: 1,
    category: 'DAI_SO',
    level: 'CO_BAN',
  },
  {
    id: 'DS_CB_02',
    question: 'Tìm x biết: 3 × x = 21',
    formula: '3x = 21 \\implies x = ?',
    options: ['6', '7', '8', '9'],
    answer: '7',
    explanation: 'x = 21 / 3 = 7.',
    timeLimit: 50,
    difficulty: 1,
    category: 'DAI_SO',
    level: 'CO_BAN',
  },
  {
    id: 'DS_CB_03',
    question: 'Tìm x biết: x - 9 = 15',
    formula: 'x - 9 = 15 \\implies x = ?',
    options: ['22', '24', '26', '28'],
    answer: '24',
    explanation: 'x = 15 + 9 = 24.',
    timeLimit: 50,
    difficulty: 1,
    category: 'DAI_SO',
    level: 'CO_BAN',
  },
  {
    id: 'DS_CB_04',
    question: 'Một chiếc bút giá 5 ngàn đồng. Mua 4 chiếc bút hết bao nhiêu tiền?',
    formula: '5 \\times 4 = ?',
    options: ['15', '20', '25', '30'],
    answer: '20',
    explanation: 'Giá tiền = 5 × 4 = 20 ngàn đồng.',
    timeLimit: 50,
    difficulty: 1,
    category: 'DAI_SO',
    level: 'CO_BAN',
  },
  {
    id: 'DS_CB_05',
    question: 'Tìm x biết: 2x + 4 = 14',
    formula: '2x + 4 = 14 \\implies 2x = 10 \\implies x = ?',
    options: ['4', '5', '6', '7'],
    answer: '5',
    explanation: '2x = 14 - 4 = 10 => x = 10 / 2 = 5.',
    timeLimit: 50,
    difficulty: 1,
    category: 'DAI_SO',
    level: 'CO_BAN',
  },

  // ==========================================
  // KHAI_CAN (Khai căn & Căn bậc hai)
  // ==========================================
  {
    id: 'KC_CB_01',
    question: 'Tính giá trị của √49',
    formula: '\\sqrt{49} = ?',
    options: ['6', '7', '8', '9'],
    answer: '7',
    explanation: 'Vì 7² = 49 nên √49 = 7.',
    timeLimit: 50,
    difficulty: 1,
    category: 'KHAI_CAN',
    level: 'CO_BAN',
  },
  {
    id: 'KC_CB_02',
    question: 'Tính giá trị của √81',
    formula: '\\sqrt{81} = ?',
    options: ['7', '8', '9', '10'],
    answer: '9',
    explanation: 'Vì 9² = 81 nên √81 = 9.',
    timeLimit: 50,
    difficulty: 1,
    category: 'KHAI_CAN',
    level: 'CO_BAN',
  },
  {
    id: 'KC_CB_03',
    question: 'Tính nhanh: √100 - √16',
    formula: '\\sqrt{100} - \\sqrt{16} = 10 - 4 = ?',
    options: ['4', '6', '8', '10'],
    answer: '6',
    explanation: '√100 = 10 và √16 = 4. Ta có: 10 - 4 = 6.',
    timeLimit: 50,
    difficulty: 1,
    category: 'KHAI_CAN',
    level: 'CO_BAN',
  },
  {
    id: 'KC_CB_04',
    question: 'Căn bậc hai của 25 (√25) là:',
    formula: '\\sqrt{25} = ?',
    options: ['3', '4', '5', '6'],
    answer: '5',
    explanation: 'Vì 5 × 5 = 25 nên √25 = 5.',
    timeLimit: 50,
    difficulty: 1,
    category: 'KHAI_CAN',
    level: 'CO_BAN',
  },

  // ==========================================
  // LUY_THUA (Lũy thừa & Mũ)
  // ==========================================
  {
    id: 'LT_CB_01',
    question: 'Giá trị của 2³ (2 lũy thừa 3) bằng bao nhiêu?',
    formula: '2^3 = 2 \\times 2 \\times 2 = ?',
    options: ['6', '8', '9', '12'],
    answer: '8',
    explanation: '2³ = 2 × 2 × 2 = 8.',
    timeLimit: 50,
    difficulty: 1,
    category: 'LUY_THUA',
    level: 'CO_BAN',
  },
  {
    id: 'LT_CB_02',
    question: 'Giá trị của 3² bằng bao nhiêu?',
    formula: '3^2 = 3 \\times 3 = ?',
    options: ['6', '8', '9', '12'],
    answer: '9',
    explanation: '3² = 3 × 3 = 9.',
    timeLimit: 50,
    difficulty: 1,
    category: 'LUY_THUA',
    level: 'CO_BAN',
  },
  {
    id: 'LT_CB_03',
    question: 'Bất kỳ số dương nào nâng lên lũy thừa 0 (ví dụ 7⁰) đều bằng:',
    formula: 'a^0 = ? \\; (a \\neq 0)',
    options: ['0', '1', '7', 'Không xác định'],
    answer: '1',
    explanation: 'Quy ước toán học: a⁰ = 1 với mọi số a khác 0.',
    timeLimit: 50,
    difficulty: 1,
    category: 'LUY_THUA',
    level: 'CO_BAN',
  },
  {
    id: 'LT_CB_04',
    question: 'Tính: 2⁴ = ?',
    formula: '2^4 = 2 \\times 2 \\times 2 \\times 2 = ?',
    options: ['8', '12', '16', '32'],
    answer: '16',
    explanation: '2⁴ = 16.',
    timeLimit: 50,
    difficulty: 1,
    category: 'LUY_THUA',
    level: 'CO_BAN',
  },

  // ==========================================
  // AM_SO (Số nguyên âm & Phép tính)
  // ==========================================
  {
    id: 'AS_CB_01',
    question: 'Tính: (-5) + 9 = ?',
    formula: '-5 + 9 = ?',
    options: ['-4', '4', '14', '-14'],
    answer: '4',
    explanation: '(-5) + 9 = 9 - 5 = 4.',
    timeLimit: 50,
    difficulty: 1,
    category: 'AM_SO',
    level: 'CO_BAN',
  },
  {
    id: 'AS_CB_02',
    question: 'Tính: 10 - 15 = ?',
    formula: '10 - 15 = ?',
    options: ['5', '-5', '-25', '25'],
    answer: '-5',
    explanation: '10 - 15 = -(15 - 10) = -5.',
    timeLimit: 50,
    difficulty: 1,
    category: 'AM_SO',
    level: 'CO_BAN',
  },
  {
    id: 'AS_CB_03',
    question: 'Tính: (-3) × (-4) = ?',
    formula: '(-3) \\times (-4) = ?',
    options: ['-12', '12', '-7', '7'],
    answer: '12',
    explanation: 'Âm nhân âm ra dương: (-3) × (-4) = 12.',
    timeLimit: 50,
    difficulty: 1,
    category: 'AM_SO',
    level: 'CO_BAN',
  },
  {
    id: 'AS_CB_04',
    question: 'Tính: (-8) + (-2) = ?',
    formula: '(-8) + (-2) = ?',
    options: ['-6', '6', '-10', '10'],
    answer: '-10',
    explanation: '(-8) + (-2) = -(8 + 2) = -10.',
    timeLimit: 50,
    difficulty: 1,
    category: 'AM_SO',
    level: 'CO_BAN',
  },

  // ==========================================
  // CHIA_HET (Dấu hiệu chia hết)
  // ==========================================
  {
    id: 'CH_CB_01',
    question: 'Số nào sau đây chia hết cho cả 2 và 5?',
    formula: 'n \\; \\vdots \\; 2 \\; \\text{và} \\; n \\; \\vdots \\; 5',
    options: ['25', '32', '45', '50'],
    answer: '50',
    explanation: 'Số chia hết cho cả 2 và 5 phải có chữ số tận cùng là 0. Do đó 50 là đáp án đúng.',
    timeLimit: 50,
    difficulty: 1,
    category: 'CHIA_HET',
    level: 'CO_BAN',
  },
  {
    id: 'CH_CB_02',
    question: 'Số 135 có chia hết cho 9 không?',
    formula: '1 + 3 + 5 = 9 \\implies 135 \\; \\vdots \\; 9 \\; ?',
    options: ['Có', 'Không', 'Chỉ chia hết cho 3', 'Không chia hết'],
    answer: 'Có',
    explanation: 'Tổng các chữ số: 1 + 3 + 5 = 9. Vì 9 chia hết cho 9 nên 135 chia hết cho 9.',
    timeLimit: 50,
    difficulty: 1,
    category: 'CHIA_HET',
    level: 'CO_BAN',
  },
  {
    id: 'CH_CB_03',
    question: 'Số nào sau đây chia hết cho 3?',
    formula: 'n \\; \\vdots \\; 3',
    options: ['14', '16', '21', '25'],
    answer: '21',
    explanation: '2 + 1 = 3 chia hết cho 3 nên 21 chia hết cho 3.',
    timeLimit: 50,
    difficulty: 1,
    category: 'CHIA_HET',
    level: 'CO_BAN',
  },
  {
    id: 'CH_CB_04',
    question: 'Số chẵn chia hết cho 2 có chữ số tận cùng là chữ số nào sau đây?',
    formula: 'n \\; \\vdots \\; 2',
    options: ['1, 3, 5', '0, 2, 4, 6, 8', 'Chỉ số 0', '3, 6, 9'],
    answer: '0, 2, 4, 6, 8',
    explanation: 'Các số có chữ số tận cùng là 0, 2, 4, 6, 8 là các số chẵn chia hết cho 2.',
    timeLimit: 50,
    difficulty: 1,
    category: 'CHIA_HET',
    level: 'CO_BAN',
  },

  // ==========================================
  // PHAN_SO (Phân số & Tỉ số)
  // ==========================================
  {
    id: 'PS_CB_01',
    question: 'Rút gọn phân số 4/8 về tối giản ta được:',
    formula: '\\frac{4}{8} = ?',
    options: ['1/2', '2/3', '1/4', '2/4'],
    answer: '1/2',
    explanation: 'Chia cả tử và mẫu cho 4: 4/8 = 1/2.',
    timeLimit: 50,
    difficulty: 1,
    category: 'PHAN_SO',
    level: 'CO_BAN',
  },
  {
    id: 'PS_CB_02',
    question: 'Tính tổng: 1/4 + 2/4 = ?',
    formula: '\\frac{1}{4} + \\frac{2}{4} = ?',
    options: ['3/8', '3/4', '2/4', '1'],
    answer: '3/4',
    explanation: 'Cùng mẫu số 4: (1 + 2)/4 = 3/4.',
    timeLimit: 50,
    difficulty: 1,
    category: 'PHAN_SO',
    level: 'CO_BAN',
  },
  {
    id: 'PS_CB_03',
    question: 'Phân số 1/2 tương ứng với bao nhiêu phần trăm (%)?',
    formula: '\\frac{1}{2} = ? \\%',
    options: ['25%', '50%', '75%', '100%'],
    answer: '50%',
    explanation: '1/2 = 50/100 = 50%.',
    timeLimit: 50,
    difficulty: 1,
    category: 'PHAN_SO',
    level: 'CO_BAN',
  },
  {
    id: 'PS_CB_04',
    question: 'Tìm 1/3 của số 27:',
    formula: '\\frac{1}{3} \\times 27 = ?',
    options: ['7', '8', '9', '10'],
    answer: '9',
    explanation: '27 / 3 = 9.',
    timeLimit: 50,
    difficulty: 1,
    category: 'PHAN_SO',
    level: 'CO_BAN',
  },

  // ==========================================
  // TUYET_DOI (Trị tuyệt đối)
  // ==========================================
  {
    id: 'TD_CB_01',
    question: 'Giá trị tuyệt đối của số âm 8: |-8| = ?',
    formula: '|-8| = ?',
    options: ['-8', '8', '0', '16'],
    answer: '8',
    explanation: 'Giá trị tuyệt đối của một số luôn là khoảng cách từ số đó đến 0 trên trục số (luôn không âm): |-8| = 8.',
    timeLimit: 50,
    difficulty: 1,
    category: 'TUYET_DOI',
    level: 'CO_BAN',
  },
  {
    id: 'TD_CB_02',
    question: 'Tính: |-15| + 5 = ?',
    formula: '|-15| + 5 = 15 + 5 = ?',
    options: ['10', '20', '-10', '-20'],
    answer: '20',
    explanation: '|-15| = 15, do đó 15 + 5 = 20.',
    timeLimit: 50,
    difficulty: 1,
    category: 'TUYET_DOI',
    level: 'CO_BAN',
  },
  {
    id: 'TD_CB_03',
    question: 'Giá trị tuyệt đối của số 0 (|0|) bằng bao nhiêu?',
    formula: '|0| = ?',
    options: ['0', '1', '-1', 'Không xác định'],
    answer: '0',
    explanation: '|0| = 0.',
    timeLimit: 50,
    difficulty: 1,
    category: 'TUYET_DOI',
    level: 'CO_BAN',
  },
  {
    id: 'TD_CB_04',
    question: 'Tính: |12| - |-7| = ?',
    formula: '|12| - |-7| = 12 - 7 = ?',
    options: ['5', '19', '-5', '-19'],
    answer: '5',
    explanation: '12 - 7 = 5.',
    timeLimit: 50,
    difficulty: 1,
    category: 'TUYET_DOI',
    level: 'CO_BAN',
  },

  // ==========================================
  // UOC_BOI (Ước & Bội)
  // ==========================================
  {
    id: 'UB_CB_01',
    question: 'Ước chung lớn nhất của 6 và 9 (ƯCLN(6, 9)) là:',
    formula: '\\text{ƯCLN}(6, 9) = ?',
    options: ['1', '2', '3', '6'],
    answer: '3',
    explanation: 'Các ước của 6: {1, 2, 3, 6}. Các ước của 9: {1, 3, 9}. Ước chung lớn nhất là 3.',
    timeLimit: 50,
    difficulty: 1,
    category: 'UOC_BOI',
    level: 'CO_BAN',
  },
  {
    id: 'UB_CB_02',
    question: 'Bội chung nhỏ nhất của 4 và 6 (BCNN(4, 6)) là:',
    formula: '\\text{BCNN}(4, 6) = ?',
    options: ['6', '12', '18', '24'],
    answer: '12',
    explanation: 'Bội của 4: 4, 8, 12, 16... Bội của 6: 6, 12, 18... Bội chung nhỏ nhất khác 0 là 12.',
    timeLimit: 50,
    difficulty: 1,
    category: 'UOC_BOI',
    level: 'CO_BAN',
  },
  {
    id: 'UB_CB_03',
    question: 'Số nào sau đây là ước của số 15?',
    formula: '15 \\; \\vdots \\; d',
    options: ['2', '4', '5', '7'],
    answer: '5',
    explanation: 'Vì 15 chia hết cho 5 (15 / 5 = 3) nên 5 là ước của 15.',
    timeLimit: 50,
    difficulty: 1,
    category: 'UOC_BOI',
    level: 'CO_BAN',
  },
  {
    id: 'UB_CB_04',
    question: 'Bội của 7 nhỏ hơn 20 là số nào sau đây?',
    formula: '7k < 20',
    options: ['12', '14', '16', '18'],
    answer: '14',
    explanation: '7 × 2 = 14 là bội của 7 và nhỏ hơn 20.',
    timeLimit: 50,
    difficulty: 1,
    category: 'UOC_BOI',
    level: 'CO_BAN',
  },
];

// Helper to generate dynamic, fast, friendly questions if repository runs out
function generateProceduralQuestion(category: MathCategory, level: MathLevel = 'CO_BAN'): Question {
  const qId = `PROC_${category}_${Date.now()}_${randInt(10, 99)}`;

  switch (category) {
    case 'NGUYEN_TO': {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19];
      const targetPrime = primes[randInt(0, primes.length - 1)];
      const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16];
      const wrong = composites.sort(() => Math.random() - 0.5).slice(0, 3);
      const opts = [targetPrime.toString(), ...wrong.map(w => w.toString())].sort(() => Math.random() - 0.5);

      return {
        id: qId,
        question: `Trong các số sau, số nào là số nguyên tố?`,
        formula: `n \\in \\mathbb{P}`,
        options: opts,
        answer: targetPrime.toString(),
        explanation: `${targetPrime} là số nguyên tố vì chỉ có hai ước là 1 và chính nó.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level,
      };
    }

    case 'CHINH_PHUONG': {
      const n = randInt(2, 10);
      const sq = n * n;
      const opts = [sq.toString(), (sq + randInt(2, 5)).toString(), (sq - randInt(2, 4)).toString(), (n * 2).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `Tính giá trị của ${n}² (${n} nhân ${n}) = ?`,
        formula: `${n}^2 = ?`,
        options: opts,
        answer: sq.toString(),
        explanation: `${n}² = ${n} × ${n} = ${sq}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level,
      };
    }

    case 'DAI_SO': {
      const a = randInt(3, 15);
      const b = randInt(16, 35);
      const ans = b - a;
      const opts = [ans.toString(), (ans + 2).toString(), (ans - 2).toString(), (ans + 5).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `Tìm x biết: x + ${a} = ${b}`,
        formula: `x + ${a} = ${b} \\implies x = ?`,
        options: opts,
        answer: ans.toString(),
        explanation: `x = ${b} - ${a} = ${ans}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level,
      };
    }

    case 'KHAI_CAN': {
      const n = randInt(2, 10);
      const sq = n * n;
      const opts = [n.toString(), (n + 1).toString(), (n - 1).toString(), (n + 2).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `Tính giá trị căn bậc hai: √${sq} = ?`,
        formula: `\\sqrt{${sq}} = ?`,
        options: opts,
        answer: n.toString(),
        explanation: `Vì ${n}² = ${sq} nên √${sq} = ${n}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level,
      };
    }

    case 'LUY_THUA': {
      const base = randInt(2, 5);
      const exp = randInt(2, 3);
      const val = Math.pow(base, exp);
      const opts = [val.toString(), (val + 2).toString(), (base * exp).toString(), (val - 2).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `Tính giá trị của ${base}^${exp} = ?`,
        formula: `${base}^{${exp}} = ?`,
        options: opts,
        answer: val.toString(),
        explanation: `${base}^${exp} = ${val}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level,
      };
    }

    case 'AM_SO': {
      const a = randInt(2, 9);
      const b = randInt(10, 20);
      const ans = a - b;
      const opts = [ans.toString(), (-ans).toString(), (ans - 2).toString(), (ans + 2).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `Tính giá trị: ${a} - ${b} = ?`,
        formula: `${a} - ${b} = ?`,
        options: opts,
        answer: ans.toString(),
        explanation: `${a} - ${b} = -(${b} - ${a}) = ${ans}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level,
      };
    }

    case 'CHIA_HET': {
      const mult = randInt(2, 9);
      const ans = mult * 5;
      const opts = [ans.toString(), (ans + 3).toString(), (ans - 2).toString(), (ans + 1).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `Số nào sau đây chia hết cho 5?`,
        formula: `n \\; \\vdots \\; 5`,
        options: opts,
        answer: ans.toString(),
        explanation: `${ans} có tận cùng là 0 hoặc 5 nên chia hết cho 5.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level,
      };
    }

    case 'PHAN_SO': {
      const num = randInt(1, 3);
      const den = 4;
      const opts = [`${num}/${den}`, `${num + 1}/${den}`, `1/2`, `1`].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `Tính: ${num}/4 + 0 = ?`,
        formula: `\\frac{${num}}{4} = ?`,
        options: opts,
        answer: `${num}/${den}`,
        explanation: `Bất kỳ số nào cộng 0 cũng bằng chính nó: ${num}/${den}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level,
      };
    }

    case 'TUYET_DOI': {
      const val = randInt(4, 25);
      const opts = [val.toString(), (-val).toString(), '0', (val * 2).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `Tính giá trị tuyệt đối: |-${val}| = ?`,
        formula: `|-${val}| = ?`,
        options: opts,
        answer: val.toString(),
        explanation: `Giá trị tuyệt đối luôn không âm: |-${val}| = ${val}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level,
      };
    }

    case 'UOC_BOI': {
      const a = randInt(2, 4);
      const x = a * 2;
      const y = a * 3;
      const g = gcd(x, y);
      const opts = [g.toString(), (g + 1).toString(), (g + 2).toString(), '1'].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `ƯCLN của ${x} và ${y} là số nào?`,
        formula: `\\text{ƯCLN}(${x}, ${y}) = ?`,
        options: opts,
        answer: g.toString(),
        explanation: `ƯCLN(${x}, ${y}) = ${g}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level,
      };
    }

    default: {
      return CURATED_QUESTIONS[randInt(0, CURATED_QUESTIONS.length - 1)];
    }
  }
}

// Function to obtain a question matching category and level
export function getQuestionForCategory(category: MathCategory, level: MathLevel = 'CO_BAN'): Question {
  const matched = CURATED_QUESTIONS.filter(q => q.category === category);
  if (matched.length > 0 && Math.random() > 0.3) {
    return matched[randInt(0, matched.length - 1)];
  }
  return generateProceduralQuestion(category, level);
}
