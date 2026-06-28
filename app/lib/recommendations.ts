// Real, publicly visible data from the AdpList mentor profile.
// Stats, verified insights, and the verbatim mentee reviews below are all
// sourced from the public AdpList mentor profile.
export const mentorBio =
  "Hello! I'm a passionate software engineer with 7 years of professional experience, specializing in front-end development for the past 5 years, primarily using React. My career has taken me through dynamic startups and established corporations in finance and e-commerce, where I've had the privilege of making a positive impact on millions of users.";

export const socialProofStats = [
  {
    label: "Total mentoring time",
    value: "1,335",
    note: "minutes on AdpList",
  },
  {
    label: "Sessions completed",
    value: "42",
    note: "1:1 mentorship sessions",
  },
  {
    label: "Average attendance",
    value: "100%",
    note: "across all sessions",
  },
  {
    label: "Written reviews",
    value: "7",
    note: "public AdpList reviews",
  },
] as const;

export interface VerifiedItem {
  id: string;
  title: string;
  detail: string;
  source: "linkedin" | "adplist";
  badge: string;
}


export interface Review {
  id: string;
  name: string;
  role: string;
  date: string;
  text: string;
  tags: string[];
}

// Real, verbatim AdpList mentee reviews (public mentor profile).
export const reviews: Review[] = [
  {
    id: "reza-shorche",
    name: "Reza Shorche",
    role: "Front-End Web Development, Bu-Ali Sina University",
    date: "October 22, 2025",
    text: "I really enjoyed my mentoring session with Parsa Khosravani! He was extremely professional, approachable, and shared clear, practical advice that helped me shape my front-end career path and improve my resume. His thoughtful feedback, positive energy, and friendly attitude made the session truly valuable and motivating. I left the meeting feeling more confident and focused about my next steps. Thank you so much, Parsa!",
    tags: [
      "Technically competent",
      "Very motivational",
      "Amazing communicator",
    ],
  },
  {
    id: "hosein-yarzade",
    name: "Hosein Yarzade",
    role: "Front-End Developer, Daracard",
    date: "October 9, 2025",
    text: "I had the pleasure of being mentored by Parsa, an exceptional Front-End Developer with deep knowledge of React and JavaScript. His guidance greatly improved my technical skills and problem-solving approach. Beyond his expertise, Parsa's patience, clear communication, and supportive attitude made learning from him an amazing experience.",
    tags: [
      "Technically competent",
      "Amazing communicator",
      "Amazing problem solver",
    ],
  },
  {
    id: "farzaneh",
    name: "Farzaneh",
    role: "Student, Amirkabir University",
    date: "March 31, 2025",
    text: "It was really informative and helped me gain clarity on what steps to take next in my front-end development journey. I appreciate the insights and direction — it definitely made me feel more confident about my path forward.",
    tags: [
      "Very motivational",
      "Amazing communicator",
      "Technically competent",
    ],
  },
  {
    id: "samira-rostami",
    name: "Samira Rostami",
    role: "Front-End Developer",
    date: "January 28, 2025",
    text: "I had a highly productive and insightful session with Parsa. He provided clear, constructive guidance on identifying and addressing my weaknesses in development and programming. He shared excellent references and introduced me to the latest technologies, along with actionable strategies for improvement. His emphasis on discipline, dedication, and structured planning was truly motivating. Highly recommended.",
    tags: [
      "Technically competent",
      "Very motivational",
      "Amazing problem solver",
    ],
  },
  {
    id: "milad-naderi",
    name: "Milad Naderi",
    role: "Frontend Developer, Sadad Informatics Corporation",
    date: "October 23, 2024",
    text: "I really enjoyed the friendly session with Parsa at AdpList! He was so informative, approachable, and knowledgeable. It was great to learn from him in such a relaxed atmosphere. Looking forward to more sessions like this.",
    tags: [
      "Amazing communicator",
      "Very motivational",
      "Technically competent",
    ],
  },
  {
    id: "amir-valizadeh",
    name: "Amir Valizadeh",
    role: "Fullstack Developer (Django · React), Felixin",
    date: "October 21, 2024",
    text: "Just finished my first session with him! He gave such practical and clear advice. He took the time to break down complex topics in a way that made perfect sense. Definitely booking another session — exactly the guidance I needed!",
    tags: [
      "Technically competent",
      "Amazing problem solver",
      "Amazing communicator",
    ],
  },
  {
    id: "saeid-rouhparvar",
    name: "Saeid Rouhparvar",
    role: "Front-End Developer, Petro",
    date: "October 17, 2024",
    text: "Overall, the mentoring session with Parsa Khosravani was incredibly insightful and beneficial. His professional guidance on managing React projects with Redux has significantly enhanced my understanding of state management.",
    tags: [
      "Technically competent",
      "Amazing problem solver",
      "Very motivational",
    ],
  },
];

export const adplistProfile = "https://adplist.org/mentors/parsa-khosravani";
export const linkedinProfile = "https://www.linkedin.com/in/parsakhosravani/";
export const adplistReviewsWidget =
  "https://adplist.org/widgets/reviews?src=parsa-khosravani";

export interface LinkedInRecommendation {
  id: string;
  name: string;
  title: string;
  relationship: string;
  date: string;
  text: string;
  profileUrl: string;
}

// Verbatim LinkedIn recommendations received on parsakhosravani's profile.
export const linkedinRecommendations: LinkedInRecommendation[] = [
  {
    id: "erfan-abbasi",
    name: "Erfan Abbasi",
    title: "Senior Transformation Manager at Mofid Securities",
    relationship: "Managed Parsa directly",
    date: "October 8, 2024",
    text: "I had the pleasure of working with Parsa as part of our front-end development team, and I can confidently say that he is a highly energetic and positive team member. Parsa consistently brings a smile to the workplace, and his enthusiasm for staying at the cutting edge of technology is truly admirable. He always explores and implements the latest tools, which adds immense value to our projects. Parsa works at an impressive speed, quickly delivering on tasks while maintaining high-quality standards. His ability to adapt to new products and environments is exceptional, allowing him to seamlessly integrate with any project he tackles. He also actively seeks out technical challenges and approaches them with determination, consistently finding the best solutions. Beyond his technical skills, Parsa excels in building strong relationships within the team. His communication skills and willingness to collaborate make him an invaluable team player. I highly recommend Parsa for any role that requires a talented and driven front-end developer.",
    profileUrl: "https://www.linkedin.com/in/ierfaaan/",
  },
  {
    id: "milad-kianifard",
    name: "Milad Kianifard",
    title:
      "Senior Frontend Engineer | React, TypeScript, Next.js | Performance, Testing, Frontend Architecture",
    relationship: "Worked with Parsa on the same team",
    date: "March 9, 2024",
    text: "Parsa's dedication to his work is truly remarkable. He consistently goes above and beyond to deliver the best results and always meets deadlines with his hard work and passion for his career. In addition to his extensive knowledge, Parsa has gained valuable experience from working across various platforms, making him a determined and valuable team member. I strongly recommend Parsa to any team looking for a dedicated and skilled professional.",
    profileUrl: "https://www.linkedin.com/in/milad-kianifard/",
  },
  {
    id: "massoud-beygi",
    name: "Massoud Beygi",
    title: "Results-Driven Team Player | Continuous Learner",
    relationship: "Managed Parsa directly",
    date: "September 30, 2023",
    text: "I highly recommend Parsa, who I had the pleasure of working with for the past three years as his direct manager. Parsa is an exceptional front-end developer with a versatile skill set that extends far beyond his expertise in React and Vue.js. During his time with us, Parsa showcased his proficiency not only in these front-end frameworks but also in JavaScript and TypeScript, which allowed him to excel in any framework or technology stack. His deep understanding and mastery of these programming languages make him a valuable asset to any team. Parsa has an unwavering commitment to staying up-to-date with the latest trends and advancements in the tech industry. In addition to his technical skills, Parsa possesses excellent soft skills, making him a pleasure to work with. His calm and composed demeanor contributes to a harmonious work environment, and his contagious smile and positive attitude never fail to boost the team's morale. In summary, Parsa is a highly skilled and dedicated front-end developer who brings a wealth of technical knowledge, adaptability, and a commitment to excellence to any project or team he joins.",
    profileUrl: "https://www.linkedin.com/in/merkousha/",
  },
  {
    id: "behzad-abbasi",
    name: "Behzad Abbasi",
    title: "Frontend Developer at Damedic",
    relationship: "Was senior to Parsa",
    date: "September 30, 2023",
    text: "Parsa is excellent at React development. He consistently creates complex and efficient React applications, delivering top-notch solutions. His coding skills, attention to detail, and commitment to best practices can greatly benefit any development process. But what really sets him apart is his fantastic teamwork. Parsa thrives in a team, contributes positively, and makes the work environment better. He doesn't just work alone; he actively engages with team members, shares ideas, and welcomes feedback to ensure the team achieves the best results.",
    profileUrl: "https://www.linkedin.com/in/behzad88/",
  },
  {
    id: "babak-taremi",
    name: "Babak Taremi",
    title: "Software Engineer • Blogger • C# and .NET enthusiast",
    relationship: "Worked with Parsa on the same team",
    date: "September 28, 2023",
    text: "I have had the privilege of working closely with Parsa, and I can confidently say that he is a highly skilled and dedicated front-end developer. Parsa has an exceptional ability to turn complex ideas into clean, efficient, and user-friendly web applications. His deep understanding of React and Next.js, along with his proficiency in modern web development tools and practices, makes him a valuable asset to any development team. Parsa consistently delivers high-quality code and demonstrates a strong commitment to meeting project goals and deadlines.",
    profileUrl: "https://www.linkedin.com/in/babak-taremi/",
  },
  {
    id: "mahsa-navidi",
    name: "Mahsa Navidi",
    title: "Product Strategy Lead",
    relationship: "Worked with Parsa on the same team",
    date: "September 21, 2023",
    text: "I highly recommend Parsa as a front-end developer. His exceptional teamwork, keen attention to detail, unstoppable work ethic, and adaptability make him a valuable asset to any project. With his dedication and skills, he consistently delivers outstanding results and contributes positively to the team's dynamics.",
    profileUrl: "https://www.linkedin.com/in/mahsa-navidi-335542156/",
  },
];
