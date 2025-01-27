export const toasterItemAnimation = {
    hidden: { 
        opacity: 1,
        x: '100vw',
        transition: { 
            type: 'spring', 
            stiffness: 300,
            damping: 20,
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition:
        { 
            type: 'spring', 
            stiffness: 500,
            damping: 30,
        }
    },
}