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
        answer: 'Defining a country can be complex and arbitrary. It encompasses sovereign states, lands, uninhabited islands, and other political entities. Additionally, there are self-declared sovereign states like Somaliland, which lack widespread recognition. So I just used this list I found online',
          link: 'http://techslides.com/list-of-countries-and-capitals',
      linkText: 'here' },


    { question: 'How is the Capitle of the day determined? 🫤', 
        answer: 'A random city is chosen everyday! Log on each day for a chance at a new guess!' },

    { question: 'What does the percent mean? 🤨', 
        answer: 'The percentage next to the distance is used to give you a rough understanding of how close to the answer you are. For example, if you have a percentage of ~0% you are the furthest away you can be from the Capitle of the day.'},
    
    { question: 'How can I support ❤️',
        answer: 'Your support is always appreciated! ',
          link: 'https://venmo.com/SamKlein55',
      linkText: 'Buy me boba 🧋'}
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
            {item.link && (
                <a href={item.link}>{item.linkText}</a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
