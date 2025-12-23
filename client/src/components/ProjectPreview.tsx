import React, { forwardRef, useRef } from 'react'
import type { Project } from '../types';
import { iframeScript } from '../assets/assets';
import { Phone } from 'lucide-react';

interface projectPreviewProps{
    project: Project;
    isGenerating: boolean;
    device?: 'Desktop'|'Phone'|'Tablet';
    showEditorPanel: boolean;
}

export interface projectPreviewRef{
    getCode: ()=>string |undefined;
}


const ProjectPreview = forwardRef<projectPreviewRef, projectPreviewProps>(({project,isGenerating,device = 'Desktop', showEditorPanel = true},ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
const resolutions ={
    Phone: 'w-[412px]',
    Tablet: 'w-[768px]',
    Desktop: 'w-[1280px]'

}

    const injectPreview =(html:string)=>{
        if(!html) return '';
        if(!showEditorPanel) return html;
        if(html.includes('</body>')){
            return html.replace('</body>',iframeScript + '</body>');
        }else{
            return html + iframeScript;
        }

    }
  return (
    <div className='relative h-full bg-gray-900 flex-1 rounded-xl overflow-hidden max-sm:ml-2'>
        {project.current_code ? (
            <>
            <iframe ref={iframeRef}
            srcDoc={injectPreview(project.current_code)}
            className={`h-full max-sm:w-full ${resolutions[device]} mx-auto transition-all`}
            />
            </>
        ):(isGenerating &&(
            <div>loading</div>
        ))}
       
    </div>
  )
})

export default ProjectPreview