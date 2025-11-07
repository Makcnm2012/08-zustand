'use client';

import { useState } from 'react';
import css from './TagsMenu.module.css';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import Link from 'next/link';
const tagsMenuNames: string[] = [
  'All notes',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes
        {isOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tagsMenuNames.map((item) => (
            <li className={css.menuItem} key={item}>
              <Link
                onClick={toggle}
                href={`/notes/filter/${item}`}
                className={css.menuLink}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
