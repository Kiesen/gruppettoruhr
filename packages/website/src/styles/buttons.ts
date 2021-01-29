export const primaryActionButtonClasses = ` 
  w-full 
  p-1 
  rounded-md
  flex 
  items-center 
  justify-center 
  bg-black 
  text-white
  transition 
  focus:outline-none
`
  .replace(/\s+/g, ' ')
  .trim();

export const secondaryActionButtonClasses = ` 
  w-full 
  p-1 
  border
  border-gray-300
  bg-white
  rounded-md
  flex 
  items-center 
  justify-center 
  focus:outline-none
`
  .replace(/\s+/g, ' ')
  .trim();

export const dangerActionButtonClasses = ` 
  w-full 
  p-1 
  bg-red-500
  rounded-md
  text-white
  flex 
  items-center 
  justify-center 
  focus:outline-none
`
  .replace(/\s+/g, ' ')
  .trim();

export const hoverScale = `
  transition 
  duration-300 
  ease-in-out 
  transform 
  hover:scale-105
`
  .replace(/\s+/g, ' ')
  .trim();

export const transitionColors = `
  transition-colors
  duration-300
  ease-in-out
`
  .replace(/\s+/g, ' ')
  .trim();
