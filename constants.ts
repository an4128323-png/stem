
import { Identity, QuizQuestion } from './types';

export const IDENTITIES: Identity[] = [
  {
    id: 1,
    title: "Bình phương của một tổng",
    formula: "(a + b)^2 = a^2 + 2ab + b^2",
    simpleExplanation: "Bình phương của một tổng bằng bình phương số thứ nhất, cộng với hai lần tích của số thứ nhất và số thứ hai, cộng với bình phương số thứ hai.",
    example: {
      steps: [
        "Tính $(x + 2y)^2$",
        "Xác định: $a = x$, $b = 2y$",
        "Áp dụng: $x^2 + 2 \\cdot x \\cdot (2y) + (2y)^2$"
      ],
      result: "x^2 + 4xy + 4y^2"
    },
    mnemonic: "Tổng bình phương: Số một bình, cộng hai lần tích, cộng số hai bình."
  },
  {
    id: 2,
    title: "Bình phương của một hiệu",
    formula: "(a - b)^2 = a^2 - 2ab + b^2",
    simpleExplanation: "Bình phương của một hiệu bằng bình phương số thứ nhất, trừ đi hai lần tích của số thứ nhất và số thứ hai, cộng với bình phương số thứ hai.",
    example: {
      steps: [
        "Tính $(x - 3)^2$",
        "Xác định: $a = x$, $b = 3$",
        "Áp dụng: $x^2 - 2 \\cdot x \\cdot 3 + 3^2$"
      ],
      result: "x^2 - 6x + 9"
    },
    mnemonic: "Hiệu bình phương: Giống tổng nhưng trừ ở chỗ hai lần tích."
  },
  {
    id: 3,
    title: "Hiệu hai bình phương",
    formula: "a^2 - b^2 = (a - b)(a + b)",
    simpleExplanation: "Hiệu hai bình phương của hai số bằng tích của hiệu hai số đó với tổng của chúng.",
    example: {
      steps: [
        "Tính $4x^2 - 9$",
        "Biến đổi về dạng bình phương: $(2x)^2 - 3^2$",
        "Áp dụng: $(2x - 3)(2x + 3)$"
      ],
      result: "(2x - 3)(2x + 3)"
    },
    mnemonic: "Hai bình trừ nhau: Tách thành hai ngoặc, một trừ nhân một cộng."
  },
  {
    id: 4,
    title: "Lập phương của một tổng",
    formula: "(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3",
    simpleExplanation: "Lập phương của một tổng bằng lập phương số thứ nhất, cộng ba lần tích bình phương số thứ nhất với số thứ hai, cộng ba lần tích số thứ nhất với bình phương số thứ hai, cộng lập phương số thứ hai.",
    example: {
      steps: [
        "Khai triển $(x + 1)^3$",
        "Xác định: $a = x, b = 1$",
        "Áp dụng: $x^3 + 3 \\cdot x^2 \\cdot 1 + 3 \\cdot x \\cdot 1^2 + 1^3$"
      ],
      result: "x^3 + 3x^2 + 3x + 1"
    },
    mnemonic: "Mũ 3 tổng: Các hệ số là 1 - 3 - 3 - 1."
  },
  {
    id: 5,
    title: "Lập phương của một hiệu",
    formula: "(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3",
    simpleExplanation: "Lập phương của một hiệu bằng lập phương số thứ nhất, trừ ba lần tích bình phương số thứ nhất với số thứ hai, cộng ba lần tích số thứ nhất với bình phương số thứ hai, trừ lập phương số thứ hai.",
    example: {
      steps: [
        "Khai triển $(x - 2)^3$",
        "Áp dụng: $x^3 - 3 \\cdot x^2 \\cdot 2 + 3 \\cdot x \\cdot 2^2 - 2^3$"
      ],
      result: "x^3 - 6x^2 + 12x - 8"
    },
    mnemonic: "Mũ 3 hiệu: Dấu đan xen Cộng - Trừ - Cộng - Trừ."
  },
  {
    id: 6,
    title: "Tổng hai lập phương",
    formula: "a^3 + b^3 = (a + b)(a^2 - ab + b^2)",
    simpleExplanation: "Tổng hai lập phương bằng tích của tổng hai số đó with bình phương thiếu của hiệu hai số đó.",
    example: {
      steps: [
        "Tính $x^3 + 8$",
        "Biến đổi: $x^3 + 2^3$",
        "Áp dụng: $(x + 2)(x^2 - x \\cdot 2 + 2^2)$"
      ],
      result: "(x + 2)(x^2 - 2x + 4)"
    },
    mnemonic: "Tổng lập phương: Ngoặc nhỏ dấu (+), ngoặc to dấu (-) ở giữa."
  },
  {
    id: 7,
    title: "Hiệu hai lập phương",
    formula: "a^3 - b^3 = (a - b)(a^2 + ab + b^2)",
    simpleExplanation: "Hiệu hai lập phương bằng tích của hiệu hai số đó with bình phương thiếu của tổng hai số đó.",
    example: {
      steps: [
        "Tính $x^3 - 27$",
        "Biến đổi: $x^3 - 3^3$",
        "Áp dụng: $(x - 3)(x^2 + x \\cdot 3 + 3^2)$"
      ],
      result: "(x - 3)(x^2 + 3x + 9)"
    },
    mnemonic: "Hiệu lập phương: Ngoặc nhỏ dấu (-), ngoặc to toàn dấu (+)."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Khai triển $(x + 1)^2$ ta được kết quả là:",
    options: ["$x^2 + 1$", "$x^2 + 2x + 1$", "$x^2 + x + 1$", "$x^2 - 2x + 1$"],
    correctAnswer: 1,
    explanation: "Áp dụng $(a+b)^2 = a^2 + 2ab + b^2$ với $a=x, b=1$ ta có $x^2 + 2x + 1$."
  },
  {
    id: 2,
    question: "Biểu thức $x^2 - 9$ được viết dưới dạng tích là:",
    options: ["$(x - 3)^2$", "$(x + 3)^2$", "$(x - 3)(x + 3)$", "$(x - 9)(x + 9)$"],
    correctAnswer: 2,
    explanation: "Đây là hiệu hai bình phương: $x^2 - 3^2 = (x-3)(x+3)$."
  },
  {
    id: 3,
    question: "Khai triển $(2x - 1)^2$ ta được:",
    options: ["$4x^2 - 1$", "$4x^2 - 4x + 1$", "$2x^2 - 4x + 1$", "$4x^2 + 4x + 1$"],
    correctAnswer: 1,
    explanation: "$(2x)^2 - 2 \\cdot 2x \\cdot 1 + 1^2 = 4x^2 - 4x + 1$."
  },
  {
    id: 4,
    question: "Tính nhanh $101^2$ bằng hằng đẳng thức nào?",
    options: ["$(100 + 1)^2$", "$(100 - 1)^2$", "$100^2 + 1^2$", "$(101 - 0)^2$"],
    correctAnswer: 0,
    explanation: "$101^2 = (100+1)^2 = 10000 + 200 + 1 = 10201$."
  },
  {
    id: 5,
    question: "Rút gọn biểu thức $(x + y)^2 - (x - y)^2$:",
    options: ["$0$", "$2x^2 + 2y^2$", "$4xy$", "$2xy$"],
    correctAnswer: 2,
    explanation: "$(x^2+2xy+y^2) - (x^2-2xy+y^2) = 4xy$."
  },
  {
    id: 6,
    question: "Biểu thức $x^3 + 3x^2 + 3x + 1$ là khai triển của:",
    options: ["$(x + 1)^2$", "$(x + 3)^3$", "$(x + 1)^3$", "$(x - 1)^3$"],
    correctAnswer: 2,
    explanation: "Đây là hằng đẳng thức lập phương của một tổng $(a+b)^3$."
  },
  {
    id: 7,
    question: "Kết quả của phép nhân $(x - 2)(x + 2)$ là:",
    options: ["$x^2 - 4$", "$x^2 + 4$", "$x^2 - 2$", "$x^2 - 4x + 4$"],
    correctAnswer: 0,
    explanation: "Áp dụng $(a-b)(a+b) = a^2 - b^2$ ta có $x^2 - 2^2 = x^2 - 4$."
  },
  {
    id: 8,
    question: "Viết biểu thức $x^2 + 6x + 9$ dưới dạng bình phương một tổng:",
    options: ["$(x + 9)^2$", "$(x + 3)^2$", "$(x + 6)^2$", "$(x - 3)^2$"],
    correctAnswer: 1,
    explanation: "$x^2 + 2 \\cdot x \\cdot 3 + 3^2 = (x+3)^2$."
  },
  {
    id: 9,
    question: "Tính nhanh $99^2$ bằng hằng đẳng thức:",
    options: ["$(100 - 1)^2$", "$(90 + 9)^2$", "$(100 + 1)^2$", "$100^2 - 1^2$"],
    correctAnswer: 0,
    explanation: "$99^2 = (100-1)^2 = 10000 - 200 + 1 = 9801$."
  },
  {
    id: 10,
    question: "Trong khai triển $(a - b)^3$, có bao nhiêu hạng tử mang dấu trừ?",
    options: ["1 hạng tử", "2 hạng tử", "3 hạng tử", "Không có hạng tử nào"],
    correctAnswer: 1,
    explanation: "$(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$. Có 2 hạng tử mang dấu trừ là $-3a^2b$ và $-b^3$."
  }
];
