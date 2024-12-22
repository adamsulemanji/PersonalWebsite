interface Internship {
  company: string;
  role: string;
  date: string;
  description: string;
  details: string;
}

export const internships: Internship[] = [
  {
    company: "Amazon",
    role: "Software Development",
    date: "August 2025",
    description: "Incoming Engineer for Crosslistings Team",
    details:
      "I have so much time before I start this job so Im relaxing till then !",
  },
  {
    company: "Amazon",
    role: "Software Development Engineer Intern",
    date: "Summer 2024",
    description:
      "Worked in the Cross Borders Organization on the Crosslistings team. Gained full development experience in a large-scale, high-impact environment.",
    details:
      "This was my first big tech internship, which allowed me to gain full development experience in a large-scale, high-impact environment.",
  },
  {
    company: "Goldman Sachs",
    role: "Market Risk Summer Analyst",
    date: "Summer 2023",
    description:
      "Managed interest rate risk for the Goldman Sachs Bank Legal Entity. Developed a new risk metric correlating delta values with bond tenures.",
    details:
      "I specifically looked at how Delta and Gamma values changed over time with the fluctuating interest rates climate.",
  },
  {
    company: "PricewaterhouseCoopers (PwC)",
    role: "Data and Technology Start Intern",
    date: "Summer 2022",
    description:
      "Delivered key insights to a non-profit leadership team to enhance donor engagement and retention.",
    details:
      "This was my first internship, so the whole experience was a learning opportunity. After this, I was able to take what I learned and apply it to my next internship, although it was not directly related.",
  },
];
