import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { Project } from '../types';
import { iframeScript } from '../assets/assets';
import { Phone } from 'lucide-react';
import EditorPanel from './EditorPanel';
import LoaderSteps from './LoaderSteps';

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
    const [selectedElement,setselectedElement] = useState<any>(null)
const resolutions ={
    Phone: 'w-[412px]',
    Tablet: 'w-[768px]',
    Desktop: 'w-full'

}
useImperativeHandle(ref,()=>({
    getCode:()=>{
        const doc = iframeRef.current?.contentDocument;
        if(!doc) return undefined;
        doc.querySelectorAll('.ai-selected-element,[data-ai-selected]').forEach((el)=>{
            el.classList.remove('ai-selected-element');
            el.removeAttribute('data-ai-selected');
            (el as HTMLElement).style.outline = '';
        })
        const previewStyle = doc.getElementById('ai-preview-style');
        if(previewStyle) previewStyle.remove();
        
        const previewScript = doc.getElementById('ai-preview-script');
        if(previewScript) previewScript.remove();

        const html = doc.documentElement.outerHTML;
        return html;
           
    }
}))
useEffect(()=>{
    const handleMessage = (event:MessageEvent)=>{
        const data = event.data;
        if(data.type === 'ELEMENT_SELECTED'){
            setselectedElement(data.payload);
        }else if(data.type === 'CLEAR_SELECTION'){
            setselectedElement(null);
        }
    }
    window.addEventListener('message',handleMessage)
    return ()=>{
        window.removeEventListener('message',handleMessage)
    };
}, []);
    const handleUpdate = (updates:any)=>{
        if(!iframeRef.current?.contentWindow) return;
        iframeRef.current.contentWindow.postMessage({
            type: 'UPDATE_ELEMENT',
            payload: updates
        }, '*')
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
            {showEditorPanel && selectedElement && (
                <EditorPanel selectedElement={selectedElement} 
                onUpdate={handleUpdate} onClose={()=>{
                    setselectedElement(null);
                    if(iframeRef.current?.contentWindow){
                        iframeRef.current.contentWindow.postMessage({
                            type: 'CLEAR_SELECTION_REQUEST',
                            payload: null
                        }, '*')
                    }
                }}/>
                
            )}
            </>
        ):(isGenerating &&(
            <LoaderSteps />
        ))}
       
    </div>
  )
})

export default ProjectPreview