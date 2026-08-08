import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-150 rounded-2xl bg-white dark:bg-dark-card dark:border-dark-border overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 text-left font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-border/40 transition-colors"
      >
        <span className="text-sm sm:text-base font-display">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-brand-600 dark:text-brand-400' : ''
          }`}
        />
      </button>

      {/* Accordion Collapse/Expand container */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] border-t border-gray-100 dark:border-dark-border' : 'max-h-0'
        } overflow-hidden`}
      >
        <div className="p-5 text-sm text-gray-650 dark:text-gray-400 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
