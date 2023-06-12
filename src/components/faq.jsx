import React, { useState } from 'react';
import '../css/faq.css';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqData = [
    { question: 'How do I play? 🤔', 
        answer: 'Its simple! Simply guess as to what you think the Capital of the day is based off of the picture. The game will give you hints as you progress to help you guess right 😄' },

    { question: 'Why is my guess not valid? 😒', 
        answer: 'Defining a country can be complex and arbitrary. It encompasses sovereign states, lands, uninhabited islands, and other political entities. Additionally, there are self-declared sovereign states like Somaliland, which lack widespread recognition. So I just used this list I found online: http://techslides.com/list-of-countries-and-capitals' },

    { question: 'Blank 2', 
        answer: 'Description 2' },

    { question: 'Blank 2', 
        answer: 'Description 2' },
    // Add more FAQ items here
  ];

  return (
    <div className="faq-container">
      <h2 id='FAQ'>F.A.Q</h2>
      {faqData.map((item, index) => (
        <div className="faq-item" key={index}>
          <div
            className={`faq-question ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <h2>{item.question}</h2>
            <span className="faq-toggle">{activeIndex === index ? '-' : '+'}</span>
          </div>
          <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
