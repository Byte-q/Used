'use client'
import { motion } from 'motion/react';
import React from 'react'

const Motion = ({children, className, dim}: {children: React.ReactNode; className?:string; dim:string}) => {
    if (dim == "x") {
        return <motion.div initial={{opacity: 0, x: 30}} whileInView={{opacity: 1, x: 0}} className={`${className} || ""`}>{children}</motion.div>
    } else {
        return <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} className={`${className} || ""`}>{children}</motion.div>
    }
}

export default Motion