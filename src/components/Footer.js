import React from 'react';

const Footer = () => {
  return (
    <div className='bg-gray-400'>
      <ul className='flex items-center capitalize max-w-screen justify-around font-bold '>
        <li className='  hover:text-cyan-300 '>
          <a
            target='_blank'
            className='tracking-widest'
            href='https://github.com/parham-mosadeq'
            rel='noreferrer'
          >
            github
          </a>
        </li>
        <li>
          <a
            target='_blank'
            rel='noreferrer'
            className='tracking-widest  hover:text-cyan-300 '
            href='noreferrer'
          >
            linkedin
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
