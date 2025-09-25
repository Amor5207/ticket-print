import React, { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface UserGuideModalProps {
  content: string;
  visible: boolean;
  onClose: () => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({ content, visible, onClose }) => {
  const [hasShownGuide, setHasShownGuide] = useLocalStorage('hasShownTicketGuide', false);
  
  // 首次加载时显示指南
  useEffect(() => {
    if (!hasShownGuide) {
      // 这里不需要额外操作，由父组件控制显示
    }
  }, [hasShownGuide]);
  
  const handleClose = () => {
    onClose();
    setHasShownGuide(true);
  };
  
  if (!visible) return null;
  
  // 将指南内容转换为HTML显示
  const getContentAsHtml = () => {
    // 简单的Markdown到HTML转换
    let html = content
      .replaceAll(/## (.*?)\n/g, '<h1 class="text-lg font-bold mt-3 mb-1">$1</h1>')
      .replaceAll(/\n/g, '<br>');
    
    return { __html: html };
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">使用说明</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <span className="sr-only">关闭</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={getContentAsHtml()}
          />
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              我知道了
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};