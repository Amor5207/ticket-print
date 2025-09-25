import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { TicketEditor } from '@/components/ticket/TicketEditor';
import { TicketPreview } from '@/components/ticket/TicketPreview';
import { TicketFront } from '@/components/ticket/TicketFront';
import { TicketBack } from '@/components/ticket/TicketBack';
import { UserGuideModal } from '@/components/ticket/UserGuideModal';
import { HeaderActions } from '@/components/ticket/HeaderActions';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultTicketData, userGuideContent } from '@/mocks/ticketData';

export default function Home() {
  const [ticketData, setTicketData] = useLocalStorage('ticketData', defaultTicketData);
  const [showGuide, setShowGuide] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const [leftCardHeight, setLeftCardHeight] = useState('auto');
  
  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      const hasShownMobileWarning = localStorage.getItem('hasShownMobileWarning') === 'true';
      if (mobile && !hasShownMobileWarning) {
        setShowMobileWarning(true);
        localStorage.setItem('hasShownMobileWarning', 'true');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // 首次加载显示使用说明
  useEffect(() => {
    const hasShownGuide = localStorage.getItem('hasShownTicketGuide') === 'true';
    if (!hasShownGuide) {
      setShowGuide(true);
    }
  }, []);
  
  const handleShowGuide = () => setShowGuide(true);
  const handleCloseGuide = () => {
    setShowGuide(false);
    localStorage.setItem('hasShownTicketGuide', 'true');
  };
  const handleCloseMobileWarning = () => setShowMobileWarning(false);

  // 打印工具函数
	const printComponent = (component: React.ReactElement) => {
	  // 创建打印容器
	  const printContainer = document.createElement('div');
	  printContainer.id = 'print-container';
	  printContainer.style.position = 'absolute';
	  printContainer.style.left = '0';
	  printContainer.style.top = '0';
	  printContainer.style.zIndex = '-1'; // 置底，不影响页面
	  printContainer.style.width = '100%';
	  document.body.appendChild(printContainer);
	
	  // 打印样式
	  const style = document.createElement('style');
	  style.textContent = `
	    @media print {
	      body > *:not(#print-container) { visibility: hidden !important; }
	      #print-container {
	        visibility: visible !important;
	        display: block;
	        margin: 0 !important;
	        padding: 0 !important;
	        overflow: visible !important;
	        page-break-before: avoid !important;
	        page-break-after: avoid !important;
	        page-break-inside: avoid !important;
	      }
	      #print-container * {
	        page-break-before: avoid !important;
	        page-break-after: avoid !important;
	        page-break-inside: avoid !important;
					font-weight: 800 !important;
	      }
	      body, #print-container {
	        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
	        font-weight: 600 !important;
	        -webkit-print-color-adjust: exact;
	        print-color-adjust: exact;
	      }
	      @page { margin: 0; }
	    }
	  `;
	  document.head.appendChild(style);
	
	  // 渲染 React 组件
	  const root = createRoot(printContainer);
	  root.render(component);
	
	  // 等 DOM 渲染完成再打印
	  setTimeout(() => {
	    window.print();
	  }, 200);
	
	  // 打印完成后清理
	  window.onafterprint = () => {
	    root.unmount();
	    document.head.removeChild(style);
	    document.body.removeChild(printContainer);
	    window.onafterprint = null;
	  };
	};

  // 打印入口
  const handlePrint = (type: string) => {
    if (type === 'back') {
      printComponent(<TicketBack data={ticketData} isPreview={true} />);
    } else if (type === 'front') {
      printComponent(<TicketFront data={ticketData} isPreview={true} />);
    }
  };

  if (isMobile && showMobileWarning) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">请在PC端打开</h2>
          <p className="text-gray-600 mb-6">本系统最佳体验在PC端，请使用电脑访问以获得完整功能。</p>
          <button
            onClick={handleCloseMobileWarning}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            我知道了
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-hidden">
      <header className="bg-white shadow-sm px-4 py-3">
        <div className="flex justify-end">
          <HeaderActions 
            onShowGuide={handleShowGuide}
            onPrintBack={() => handlePrint('back')}
            onPrintFront={() => handlePrint('front')}
          />
        </div>
      </header>
      
       <main className="flex-1 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex flex-row gap-8 h-full">
          <div className="w-3/5 rounded-lg p-4 flex flex-col" ref={leftCardRef}>
            <TicketEditor data={ticketData} onChange={setTicketData} />
          </div>
          <div className="w-2/5 rounded-lg p-4 flex flex-col items-center justify-center h-[calc(100vh-4.5rem)] sticky top-[3rem] overflow-hidden">
            <TicketPreview data={ticketData} />
          </div>
        </div>
      </main>
      
      <UserGuideModal 
        content={userGuideContent} 
        visible={showGuide} 
        onClose={handleCloseGuide} 
      />
    </div>
  );
}
