// import { useState } from 'react';
// import { Send, User, Phone, BicepsFlexed } from 'lucide-react';
// import logo from './assets/BLACK_YELLOW_HORIZONTAL.png';

// import './App.css'

// interface FormData {
//   nome: string;
//   telefone: string;
//   ministerios: string[];
// }

// function AppBKP() {
//   const [formData, setFormData] = useState<FormData>({
//     nome: '',
//     telefone: '',
//     ministerios: [],
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const target = e.target;
//     const { name } = target;

//     if (target instanceof HTMLSelectElement && target.multiple) {
//       // Para selects múltiplos
//       const selectedValues = Array.from(target.options)
//         .filter(option => option.selected)
//         .map(option => option.value);
//       setFormData(prev => ({
//         ...prev,
//         [name]: selectedValues
//       }));
//     } else if (target instanceof HTMLInputElement && target.type === 'checkbox') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: target.checked
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: target.value
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');

//     try {
//       const response = await fetch('https://automacao.igrejafamilia.net.br/webhook/voluntariado', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           ministerios: formData.ministerios.join(', '), // Envia como string separada por vírgula
//         }),
//       });

//       if (response.ok) {
//         setMessage('Cadastro realizado com sucesso!');
//         setFormData({
//           nome: '',
//           telefone: '',
//           ministerios: [],
//         });
//       } else {
//         throw new Error('Erro ao enviar dados');
//       }
//     } catch (error) {
//       setMessage('Erro ao enviar cadastro. Tente novamente.');
//       console.error('Erro:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="min-h-full min-w-full bg-white">
//       <div className="max-w-md mx-auto px-4 py-6">
//         {/* Logo da Igreja */}
//         <div className="flex flex-col items-center text-center mb-8">
//           <img src={logo} alt="Igreja Familia" className='w-42' />
//           {/* <p className="text-gray-900 text-lg font-bold mt-6">Inscrição Jejum da Família</p> */}
//         </div>

//         {/* Mensagem de Status */}
//         {message && (
//           <div className={`mb-4 p-4 rounded-lg text-center ${
//             message.includes('sucesso') 
//               ? 'bg-green-50 text-green-800 border border-green-200' 
//               : 'bg-red-50 text-red-800 border border-red-200'
//           }`}>
//             {message}
//           </div>
//         )}

//         {/* Formulário */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Nome */}
//           <div>
//             <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//               <User className="w-4 h-4 mr-2 text-yellow-500" />
//               Nome Completo
//             </label>
//             <input
//               type="text"
//               name="nome"
//               value={formData.nome}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
//               placeholder="Digite seu nome completo"
//             />
//           </div>

//           {/* Celular */}
//           <div>
//             <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//               <Phone className="w-4 h-4 mr-2 text-yellow-500" />
//               Celular
//             </label>
//             <input
//               type="tel"
//               name="telefone"
//               value={formData.telefone}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
//               placeholder="27900000000"
//             />
//           </div>

//           {/* Ministerio */}
//           <div>
//             <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//               <BicepsFlexed className="w-4 h-4 mr-2 text-yellow-500" />
//               Quais ministérios você deseja participar?
//             </label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
//               {[
//                 "Apoio",
//                 "Balcão de Membresia",
//                 "Boas Vindas",
//                 "Estacionamento",
//                 "Recepção",
//                 "Sala de Voluntários",
//                 "Dizimos e Ofertas",
//                 "Fotografia e Video",
//                 "Transmissão",
//                 "Iluminação",
//                 "Projeção",
//                 "Kids",
//                 "Familia Music",
//                 "Teatro",
//                 "Dança",
//                 "Haja",
//                 "Familia Store"
//               ].map((min) => (
//                 <label key={min} className="flex items-center text-base text-zinc-900">
//                   <input
//                     type="checkbox"
//                     name="ministerios"
//                     value={min}
//                     checked={formData.ministerios.includes(min)}
//                     onChange={e => {
//                       const checked = e.target.checked;
//                       setFormData(prev => ({
//                         ...prev,
//                         ministerios: checked
//                           ? [...prev.ministerios, min]
//                           : prev.ministerios.filter(j => j !== min)
//                       }));
//                     }}
//                     className="mr-2 accent-yellow-500"
//                   />
//                   {min === "Kids" ? "Familia Kids" : min === "Familia Music" ? "Familia Music (Louvor)" : min}
//                 </label>
//               ))}
//             </div>
//             <p className="text-xs text-gray-500 mt-1">Selecione um ou mais ministérios.</p>
//           </div>

//           {/* Botão Submit */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 mt-6"
//           >
//             {isLoading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                 <span>Enviando...</span>
//               </>
//             ) : (
//               <>
//                 <Send className="w-5 h-5" />
//                 <span>Enviar</span>
//               </>
//             )}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="text-center mt-4 text-xs text-gray-500">
//           <p>Seus dados são tratados com total segurança e privacidade</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default App
