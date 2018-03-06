/**
 * Types: heroImage [src, caption],
          image [src],
          space [amount],
          video [url],
          h3SubHeading [alignment, text],
          paragraph [text],
          caption [alignment,text]
 * */

/*
  categoryTemplate contains a list of pages. Each page has a path name, which
  becomes the page title, and a list of data. Each item in the list of data
  must have a type and must also have corresponding information for each option
  corresponding to it. This excludes any alignment option. These have a default
  value and do not otherwise need to be specified.
 */

export const categoryTemplate = [
  {
    path: 'first_path', // becomes page title
    data: [
      {
        type: 'heroImage',
        src: 'test_image.jpg', // src is pulled from public/img folder
        caption: 'This is a caption',
      },
      {
        type: 'image',
        src: 'test_image.jpg', // src is pulled from public/img folder
      },
      {
        type: 'space',
        amount: 2, // each space is 1rem so amount 2 would give 2rem of space
      },
      {
        type: 'video',
        url: 'https://player.vimeo.com/video/221645516?title=0&byline=0&portrait=0', // currently only tested with Vimeo
      },
      {
        type: 'h3SubHeading',
        alignment: 'center', // options: 'left' or 'center'. Default is 'left' so no need to specify
        text: 'someSubHeading',
      },
      {
        type: 'paragraph',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        type: 'caption',
        alignment: 'left', // options: 'left' or 'center'. Default is 'center' so no need to specify
        text: 'this is a caption',
      },
    ],
  },
]

/*
  You must specify each page path also in the list below. These are imported
  into the navigation to create the menu options.
*/

export const category_template_menu = [{ path: 'first_path' }]
