import { useEffect, useState } from 'react';
import { Send, User, Phone, Baby, Cake, FileUser } from 'lucide-react';
import logo from './assets/FAMÍLIA KIDS.png';

import './App.css'

interface FormData {
  nomeResponsavel: string;
  telefone: string;
  parentesco: string;
  nomeCrianca: string;
  idade: number;
  termo: boolean;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    nomeResponsavel: '',
    telefone: '',
    parentesco: '',
    nomeCrianca: '',
    idade: 0,
    termo: false,
  });

  const dateClose = new Date("2025-10-07T00:00:00-03:00");
  const [isColsed, setIsClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name } = target;

    if (target instanceof HTMLSelectElement && target.multiple) {
      // Para selects múltiplos
      const selectedValues = Array.from(target.options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData(prev => ({
        ...prev,
        [name]: selectedValues
      }));
    } else if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: target.value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://automacao.igrejafamilia.net.br/webhook/kids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      });

      if (response.ok) {
        setMessage('Cadastro realizado com sucesso!');
        setFormData({
          nomeResponsavel: '',
          telefone: '',
          parentesco: '',
          nomeCrianca: '',
          idade: 0,
          termo: false,
        });
      } else {
        throw new Error('Erro ao enviar dados');
      }
    } catch (error) {
      setMessage('Erro ao enviar cadastro. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const now = new Date();
    if(now > dateClose) {
      setIsClosed(true);
    }
  }, []);

  return (
    <div className="min-h-full min-w-full bg-white">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Logo da Igreja */}
        <div className="flex flex-col items-center text-center mb-8">
          <img src={logo} alt="Igreja Familia" className='w-42' />
          { isColsed ? <p className="text-red-700 text-lg font-bold mt-6">Inscrições Encerradas!!!</p> : 
          <p className="text-gray-900 text-lg font-bold mt-6">Inscrição dia das crianças Familia Kids</p>}
          
        </div>

        {/* Mensagem de Status */}
        {message && (
          <div className={`mb-4 p-4 rounded-lg text-center ${
            message.includes('sucesso') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2 text-yellow-500" />
              Nome do Responsável
            </label>
            <input
              type="text"
              name="nomeResponsavel"
              value={formData.nomeResponsavel}
              onChange={handleInputChange}
              disabled={isColsed}
              required
              className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              placeholder="Digite seu nome completo"
            />
          </div>

          {/* Celular */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 mr-2 text-yellow-500" />
              Celular do Responsável
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              disabled={isColsed}
              required
              className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              placeholder="27900000000"
            />
          </div>

          {/* Parentesco */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FileUser className="w-4 h-4 mr-2 text-yellow-500" />
              Parentesco com a Criança
            </label>
            <input
              type="text"
              name="parentesco"
              value={formData.parentesco}
              onChange={handleInputChange}
              disabled={isColsed}
              required
              className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              placeholder="Ex: Mãe, Pai, Tio, etc."
            />
          </div>

          {/* Nome da Criança */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Baby className="w-4 h-4 mr-2 text-yellow-500" />
              Nome da Criança
            </label>
            <input
              type="text"
              name="nomeCrianca"
              value={formData.nomeCrianca}
              onChange={handleInputChange}
              disabled={isColsed}
              required
              className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              placeholder="Digite o nome da criança"
            />
          </div>

          {/* Idade da Criança */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Cake className="w-4 h-4 mr-2 text-yellow-500" />
              Idade da Criança
            </label>
            <input
              type="number"
              name="idade"
              value={formData.idade || ''}
              onChange={handleInputChange}
              disabled={isColsed}
              required
              min={0}
              className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              placeholder="Digite a idade da criança"
            />
          </div>

          {/* Termo de Responsabilidade */}
          <div className="flex items-start">
            <input
              type="checkbox"
              name="termo"
              disabled={isColsed}
              checked={formData.termo}
              onChange={handleInputChange}
              className="mt-1 mr-2 h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label className="text-left text-sm text-gray-700">
              Confirmo que não estou participando do coral kids e estarei presente no dia 12 de outubro, disponível para servir em qualquer uma das celebrações as 17h ou às 19h30.
            </label>
          </div>

          {/* Botão Submit */}
          <button
            type="submit"
            disabled={isLoading || isColsed}
            className="w-full bg-gradient-to-t from-[#FF7B00] to-[#FABA16] hover:opacity-90 disabled:opacity-60 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 mt-6"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Enviar</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 text-xs text-gray-500">
          <p>Seus dados são tratados com total segurança e privacidade</p>
        </div>
      </div>
    </div>
  )
}

export default App
