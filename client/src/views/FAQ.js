import React, { useState } from 'react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is a sports pass?",
      answer:
        "A sports pass includes all home football games for the season as well as home events for all ticketed sports in both the fall and spring semesters (Soccer, Volleyball, Men's Basketball, Women's Basketball, Baseball, and Softball). Postseason, special events, and high school events hosted by Texas A&M are not included. Sports passes are only valid for currently enrolled, registered students at Texas A&M.",
    },
    {
      question: "What do I need to enter each event?",
      answer:
        "At football games, you will need your ticket and student ID only. For all other events, you only need your student ID to enter at the designated student entries. For additional gameday protocols, click here.",
    },
    {
      question: "Can I use someone else's sports pass?",
      answer:
        "No. Students use their valid Texas A&M ID to enter events. If you do not have a sports pass, you will need to purchase a student walkup ticket at the box office for admittance.",
    },
    {
      question: "What if I do not have my student ID?",
      answer: "You will not be able to enter events without your current student ID.",
    },
    {
      question: "What payments do you accept for tickets?",
      answer:
        "The 12th Man Foundation Ticket Office accepts Cash, Visa, MasterCard, Discover, and American Express for ticket purchases. We DO NOT accept checks or bill to your student fees.",
    },
    {
      question: "How can I replace lost or stolen tickets?",
      answer: "Please safeguard your tickets because they are not replaceable.",
    },
    {
      question: "What do I need to do to drop my sports option?",
      answer:
        "If you are withdrawing from the university, click here to request a refund. The deadline to request a sports pass refund is Nov. 29.",
    },
  ];

  return (
    <div className="flex flex-col items-center px-4">
      <h1 className="text-3xl font-custom-font font-semibold mb-8 mt-24 text-center">Frequently Asked Questions</h1>

      <div className="bg-gray-100 w-full max-w-4xl p-6 rounded-lg shadow-lg border-4 border-gradient-to-r from-blue-300 to-blue-500">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            {/* Question */}
            <button
              onClick={() => toggleDropdown(index)}
              className="w-full text-left text-lg font-bold text-gray-800 p-4 bg-blue-100 rounded hover:bg-blue-200 focus:outline-none"
            >
              {faq.question}
              <span className="float-right text-gray-600">
                {openIndex === index ? '-' : '+'}
              </span>
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div className="p-4 bg-gray-50 border-t border-gray-300 text-gray-700">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
