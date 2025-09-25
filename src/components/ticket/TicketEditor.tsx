import React, { useState } from 'react';

interface TicketEditorProps {
  data: any;
  onChange: (data: any) => void;
}

export const TicketEditor: React.FC<TicketEditorProps> = ({ data, onChange }) => {
  // 使用状态管理表单数据
  const [formData, setFormData] = useState(data);
  const [activeTab, setActiveTab] = useState<'front' | 'back'>('front');
  
  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    onChange(newData);
  };
  
  // 处理段落添加
  const handleAddParagraph = () => {
    const newParagraphs = [...formData.backParagraphs, '新段落内容'];
    const newData = { ...formData, backParagraphs: newParagraphs };
    setFormData(newData);
    onChange(newData);
  };
  
  // 处理段落删除
  const handleRemoveParagraph = (index: number) => {
    if (formData.backParagraphs.length <= 1) return; // 至少保留一个段落
    
    const newParagraphs = formData.backParagraphs.filter((_, i: number) => i !== index);
    const newData = { ...formData, backParagraphs: newParagraphs };
    setFormData(newData);
    onChange(newData);
  };
  
  // 处理段落变化
  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...formData.backParagraphs];
    newParagraphs[index] = value;
    const newData = { ...formData, backParagraphs: newParagraphs };
    setFormData(newData);
    onChange(newData);
  };
  
  // 处理换行切换
  const handleWrapToggle = () => {
    const newData = { ...formData, wrapText: !formData.wrapText };
    setFormData(newData);
    onChange(newData);
  };
  
  return (
    <div className="space-y-6 p-6 rounded-lg h-full">
      <div className="pb-2">
        <div className="flex space-x-6 mb-2">
          <div
            onClick={() => setActiveTab('front')}
            className={`font-medium pb-1 cursor-pointer transition-all ${
              activeTab === 'front' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            车票正面
          </div>
          <div
            onClick={() => setActiveTab('back')}
            className={`font-medium pb-1 cursor-pointer transition-all ${
              activeTab === 'back' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            车票背面
          </div>
        </div>
      </div>
      
      {activeTab === 'front' ? (
         <div className="space-y-6">
           {/* 移除"正面信息"标题 */}
          
           <div className="grid grid-cols-4 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700">车票编号</label>
               <input
                 type="text"
                 name="ticketNumber"
                 value={formData.ticketNumber}
                 onChange={handleInputChange}
                 className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
               />
							</div>
							 <div>
                <label className="block text-sm font-medium text-gray-700">检票口</label>
                 <input
                   type="text"
                   name="checkGate"
                   value={formData.checkGate}
                   onChange={handleInputChange}
                   className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   placeholder="不填写则不显示"
                 />
               </div>
						 <div>
                  <label className="block text-sm font-medium text-gray-700">车次</label>
                   <input
                     type="text"
                     name="trainNumber"
                     value={formData.trainNumber}
                     onChange={handleInputChange}
                     className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   />
               </div>
              
               <div>
                  <label className="block text-sm font-medium text-gray-700">票价</label>
                   <input
                     type="text"
                     name="price"
                     value={formData.price}
                     onChange={handleInputChange}
                     className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   />
               </div>
					 </div>
             
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700">出发站</label>
								  <div className="grid grid-cols-2 gap-2">
                   <input
                     type="text"
                     name="departureStation"
                     value={formData.departureStation}
                     onChange={handleInputChange}
                     className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   />
 								 <input
                   type="text"
                   name="departureStationEn"
                   value={formData.departureStationEn}
                   onChange={handleInputChange}
                   className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   placeholder="英文"
                 />
									</div>
               </div>
              
               <div>
                  <label className="block text-sm font-medium text-gray-700">到达站</label>
								  <div className="grid grid-cols-2 gap-2">
                   <input
                     type="text"
                     name="arrivalStation"
                     value={formData.arrivalStation}
                     onChange={handleInputChange}
                     className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   />
 									 <input
 	                  type="text"
 	                  name="arrivalStationEn"
 	                  value={formData.arrivalStationEn}
 	                  onChange={handleInputChange}
 	                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
 	                  placeholder="英文"
 	                />
									</div>
                  </div>
             </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                 <label className="block text-sm font-medium text-gray-700">日期</label>
                    <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                    placeholder="例如：2023年05月26日"
                   />
               </div>
              
               <div>
                  <label className="block text-sm font-medium text-gray-700">时间</label>
                   <input
                     type="text"
                     name="time"
                     value={formData.time}
                     onChange={handleInputChange}
                     className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   />
               </div>

							 <div>
                  <label className="block text-sm font-medium text-gray-700">车厢座位</label>
                  <div className="grid grid-cols-2 gap-2">
                     <input
                       type="text"
                       name="carriage"
                       value={formData.carriage}
                       onChange={handleInputChange}
                       className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                       placeholder="车厢"
                     />
                      <input
                       type="text"
                       name="seat"
                       value={formData.seat}
                       onChange={handleInputChange}
                       className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                       placeholder="座位"
                     />
                </div>
              </div>
              
               <div>
                  <label className="block text-sm font-medium text-gray-700">座位类型</label>
                   <input
                     type="text"
                     name="seatType"
                     value={formData.seatType}
                     onChange={handleInputChange}
                     className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   />
               </div>
            </div>
            
             <div className="grid grid-cols-2 gap-4">
            
             <div>
                <label className="block text-sm font-medium text-gray-700">车票用途</label>
                 <input
                   type="text"
                   name="ticketType"
                   value={formData.ticketType}
                   onChange={handleInputChange}
                   className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   placeholder="例如：仅供报销使用"
                 />
             </div>
            
             <div>
                <label className="block text-sm font-medium text-gray-700">身份证号</label>
                   <input
                   type="text"
                   name="idCard"
                   value={formData.idCard}
                   onChange={handleInputChange}
                   className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   placeholder="将自动脱敏处理"
                 />
 						 </div>
             
             <div className="grid grid-cols-2 gap-4 col-span-2">
               <div>
                 <label className="block text-sm font-medium text-gray-700">乘客姓名</label>
                    <input
                    type="text"
                    name="passengerName"
                    value={formData.passengerName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                  />
              </div>
              
              <div>
                 <label className="block text-sm font-medium text-gray-700">底部编号</label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                  />
              </div>
             </div>
						 </div>
            
              <div className="grid grid-cols-2 gap-4 col-span-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">备注文字1</label>
                   <input
                     type="text"
                     name="notes1"
                     value={formData.notes1}
                     onChange={handleInputChange}
                     className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">备注文字2</label>
                   <input
                     type="text"
                     name="notes2"
                     value={formData.notes2}
                     onChange={handleInputChange}
                     className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                   />
                </div>
              </div>
          </div>
      ) : (
         <div className="space-y-6">
           {/* 移除"背面信息"标题 */}
          
           <div>
              <label className="block text-sm font-medium text-gray-700">标题</label>
                <input
                  type="text"
                  name="backTitle"
                  value={formData.backTitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 bg-white transition-all duration-200 hover:border-gray-400"
                />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">段落内容</label>
                <button
                  type="button"
                  onClick={handleAddParagraph}
                  className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="添加段落"
                >
                  <i class="fa-solid fa-plus w-4 h-4"></i>
                  添加
                </button>
            </div>
            
             <div className="space-y-3">
               {formData.backParagraphs.map((para: string, index: number) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-1 flex items-center transition-all duration-200">
                     <input
                       value={para}
                       onChange={(e) => handleParagraphChange(index, e.target.value)}
                       className="flex-1 p-4 bg-white border-0 outline-none focus:ring-1 focus:ring-blue-500 rounded-md"
                       rows={2}
                     />
                     <button
                       type="button"
                       onClick={() => handleRemoveParagraph(index)}
                       className="ml-1 text-red-500 hover:text-red-700 p-2"
                       disabled={formData.backParagraphs.length <= 1}
                       aria-label="删除段落"
                     >
                       <i class="fa-solid fa-trash"></i>
                     </button>
                   </div>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};