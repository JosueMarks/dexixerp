import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Package, 
  FileText, 
  DollarSign, 
  MessageSquare, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Download, 
  Layers, 
  Maximize2, 
  Send, 
  ChevronRight, 
  Calculator,
  UserCheck,
  Instagram,
  Phone,
  Filter,
  X,
  Printer,
  Sparkles,
  Bot,
  BrainCircuit,
  Wand2,
  ChevronLeft,
  Loader2,
  Lock,
  ShieldAlert,
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const BRAND_COLORS = {
  purpleGrad: "from-[#120e24] via-[#17122c] to-[#251c44]",
  neonGreen: "#39FF14", 
  neonGreenHover: "#2ee010",
  electricViolet: "#7A22FF",
  darkBg: "#0f0c1b",
  cardBg: "#17122c",
  textColor: "text-slate-100",
  mutedText: "text-slate-400"
};

const INITIAL_CUSTOMERS = [
  { id: 'c1', name: 'Tapegás Distribuidora', contact: 'Renato Silva', phone: '98988776655', email: 'contato@tapegas.com.br', city: 'São Luís', ordersCount: 5, status: 'Ativo' },
  { id: 'c2', name: 'Fiori Lanches', contact: 'Marta Souza', phone: '98981223344', email: 'fiorilanches@hotmail.com', city: 'São Luís', ordersCount: 2, status: 'Ativo' },
  { id: 'c3', name: 'Kiama Energia', contact: 'Rodrigo Nunes', phone: '98984201122', email: 'eventos@kiama.com.br', city: 'Imperatriz', ordersCount: 8, status: 'Ativo' },
  { id: 'c4', name: 'Clínica Sorriso Feliz', contact: 'Dra. Sandra', phone: '98991445566', email: 'financeiro@sorrisofeliz.com.br', city: 'São José de Ribamar', ordersCount: 1, status: 'Inativo' }
];

const INITIAL_PRODUCTS = [
  { id: 'p1', name: 'Lona Brilhosa com Ilhós 440g', category: 'Lonas/Mídias', stock: 120, unit: 'm²', cost: 18.00, price: 45.00, minStock: 20 },
  { id: 'p2', name: 'Adesivo Vinil Fosco Recorte', category: 'Adesivos', stock: 85, unit: 'm²', cost: 12.50, price: 35.00, minStock: 15 },
  { id: 'p3', name: 'Estrutura Metálica em Metalom', category: 'Serralheria', stock: 45, unit: 'm', cost: 22.00, price: 60.00, minStock: 10 },
  { id: 'p4', name: 'Crachá de PVC Rígido com Presilha', category: 'Crachás/Credenciais', stock: 450, unit: 'un', cost: 1.80, price: 6.50, minStock: 50 },
  { id: 'p5', name: 'Cartão de Visita Couchê 300g (UV Total)', category: 'Papelaria', stock: 12, unit: 'milheiro', cost: 45.00, price: 110.00, minStock: 5 },
  { id: 'p6', name: 'Letra Caixa ACM / Chapa Galvanizada', category: 'Fachadas', stock: 8, unit: 'm²', cost: 120.00, price: 350.00, minStock: 2 }
];

const INITIAL_ORDERS = [
  { 
    id: 'OS-1024', 
    customerId: 'c1', 
    customerName: 'Tapegás Distribuidora',
    items: [
      { productId: 'p1', productName: 'Lona Brilhosa com Ilhós 440g', qty: 15, unit: 'm²', price: 45.00, total: 675.00 }
    ],
    total: 675.00, 
    status: 'Concluído', 
    date: '2026-06-01', 
    deliveryDate: '2026-06-03',
    description: 'Fachada principal da loja de distribuição de gás. Acabamento com ilhós reforçado.'
  },
  { 
    id: 'OS-1025', 
    customerId: 'c2', 
    customerName: 'Fiori Lanches',
    items: [
      { productId: 'p5', productName: 'Cartão de Visita Couchê 300g (UV Total)', qty: 2, unit: 'milheiro', price: 110.00, total: 220.00 },
      { productId: 'p2', productName: 'Adesivo Vinil Fosco Recorte', qty: 4, unit: 'm²', price: 35.00, total: 140.00 }
    ],
    total: 360.00, 
    status: 'Produzindo', 
    date: '2026-06-04', 
    deliveryDate: '2026-06-08',
    description: 'Adesivação dos balcões de atendimento e cartões de visita para fidelidade.'
  },
  { 
    id: 'OS-1026', 
    customerId: 'c3', 
    customerName: 'Kiama Energia',
    items: [
      { productId: 'p4', productName: 'Crachá de PVC Rígido com Presilha', qty: 120, unit: 'un', price: 6.50, total: 780.00 }
    ],
    total: 780.00, 
    status: 'Pendente', 
    date: '2026-06-05', 
    deliveryDate: '2026-06-12',
    description: 'Crachás de credenciamento para o Workshop de Armazenamento de Energia.'
  }
];

const INITIAL_FINANCIALS = [
  { id: 'f1', type: 'Receita', category: 'Venda de Serviços', description: 'Recebimento OS-1024 - Tapegás', amount: 675.00, date: '2026-06-03', status: 'Pago' },
  { id: 'f2', type: 'Despesa', category: 'Insumos', description: 'Compra de rolo de lona 440g', amount: 480.00, date: '2026-06-02', status: 'Pago' },
  { id: 'f3', type: 'Receita', category: 'Venda de Serviços', description: 'Entrada 50% OS-1026 - Kiama', amount: 390.00, date: '2026-06-05', status: 'Pago' },
  { id: 'f4', type: 'Despesa', category: 'Fixa', description: 'Energia Elétrica Unidade Comercial', amount: 350.00, date: '2026-06-05', status: 'Pendente' },
  { id: 'f5', type: 'Despesa', category: 'Marketing', description: 'Anúncios Instagram Dexix', amount: 150.00, date: '2026-06-04', status: 'Pago' }
];

const INITIAL_USERS = [
  { id: 'u1', name: 'Lucas Dexix', email: 'lucas@dexix.com.br', role: 'Administrador', status: 'Ativo', avatar: 'LD' },
  { id: 'u2', name: 'Mariana Silva', email: 'mariana.financeiro@dexix.com.br', role: 'Financeiro', status: 'Ativo', avatar: 'MS' },
  { id: 'u3', name: 'André Souza', email: 'andre.producao@dexix.com.br', role: 'Produção', status: 'Ativo', avatar: 'AS' },
  { id: 'u4', name: 'Carla Nogueira', email: 'carla.vendas@dexix.com.br', role: 'Vendedor', status: 'Ativo', avatar: 'CN' }
];

const DexixLogo = ({ size = "normal" }) => {
  const isLarge = size === "large";
  return (
    <div className={`flex items-center gap-3 ${isLarge ? 'scale-110 py-4' : ''}`}>
      <svg className={`${isLarge ? 'w-14 h-14' : 'w-10 h-10'}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 35 H40 L35 45 H10 Z" fill="#F4D03F" />
        <path d="M12 45 H45 L40 55 H7 Z" fill="#E91E63" />
        <path d="M18 55 H38 L33 65 H13 Z" fill="#00E5FF" />
        <path d="M30 25 C30 25 65 25 80 48 C65 70 30 70 30 70 C38 58 38 37 30 25 Z" fill="#2C3E50" />
        <path d="M45 25 C45 25 72 38 80 48 C72 58 45 70 45 70 C50 60 50 35 45 25 Z" fill="#34495E" />
      </svg>
      <div>
        <h1 className={`font-black tracking-tight leading-none ${isLarge ? 'text-3xl' : 'text-xl'} text-white`}>
          DEXIX
        </h1>
        <p className={`text-xs uppercase tracking-[0.25em] font-semibold text-[#39FF14] ${isLarge ? 'text-sm' : ''}`}>
          comunicação
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [financials, setFinancials] = useState(INITIAL_FINANCIALS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);

  // Estados de Busca e Filtro
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');

  // Estados de Modais
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false);
  const [isViewOrderModalOpen, setIsViewOrderModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // Seleções para Visualização/Edição
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notificationTarget, setNotificationTarget] = useState({ name: '', phone: '', context: '' });
  const [customNotificationMessage, setCustomNotificationMessage] = useState('');
  const [notificationStatusMsg, setNotificationStatusMsg] = useState('');

  // Formulários auxiliares
  const [newCustomer, setNewCustomer] = useState({ name: '', contact: '', phone: '', email: '', city: '', status: 'Ativo' });
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Lonas/Mídias', stock: 0, unit: 'm²', cost: 0, price: 0, minStock: 5 });
  const [newOrder, setNewOrder] = useState({
    customerId: '',
    items: [],
    status: 'Pendente',
    deliveryDate: '',
    description: '',
    tempProductId: '',
    tempQty: 1
  });
  const [newFinancial, setNewFinancial] = useState({ type: 'Receita', category: 'Venda de Serviços', description: '', amount: 0, date: '', status: 'Pendente' });
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'Vendedor', status: 'Ativo' });

  // --- ESTADOS PARA AS INTEGRACÕES DE INTELIGÊNCIA ARTIFICIAL GEMINI ---
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotInput, setCopilotInput] = useState('');
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);
  const [copilotMessages, setCopilotMessages] = useState([
    {
      role: 'assistant',
      text: 'Olá! Sou o **Dexix Copilot**, seu analista de IA integrado. Analisei seu estoque, histórico de ordens de serviço e fluxo de caixa. Como posso te ajudar a lucrar e otimizar a operação hoje?'
    }
  ]);
  const [aiOsPrompt, setAiOsPrompt] = useState('');
  const [isAiOsLoading, setIsAiOsLoading] = useState(false);
  const [aiMsgTone, setAiMsgTone] = useState('Persuasivo');
  const [isAiMsgLoading, setIsAiMsgLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [copilotMessages]);

  const [toast, setToast] = useState(null);
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const metrics = useMemo(() => {
    const totalRevenue = financials
      .filter(f => f.type === 'Receita' && f.status === 'Pago')
      .reduce((sum, f) => sum + f.amount, 0);

    const totalExpenses = financials
      .filter(f => f.type === 'Despesa')
      .reduce((sum, f) => sum + f.amount, 0);

    const accountsReceivable = financials
      .filter(f => f.type === 'Receita' && f.status === 'Pendente')
      .reduce((sum, f) => sum + f.amount, 0);

    const activeOSCount = orders.filter(o => o.status !== 'Concluído' && o.status !== 'Cancelado').length;
    const lowStockCount = products.filter(p => p.stock <= p.minStock).length;

    return {
      balance: totalRevenue - totalExpenses,
      revenue: totalRevenue,
      expenses: totalExpenses,
      receivable: accountsReceivable,
      activeOS: activeOSCount,
      lowStock: lowStockCount
    };
  }, [financials, orders, products]);

  const COLORS = ['#7A22FF', '#39FF14', '#00E5FF', '#E91E63', '#F4D03F', '#8E44AD'];

  // Processamento dinâmico para os gráficos com base nos lançamentos financeiros
  const financialChartData = useMemo(() => {
    const dates = Array.from(new Set(financials.map(f => f.date))).sort();
    if (dates.length === 0) {
      return [{ name: 'Sem lançamentos', Receitas: 0, Despesas: 0 }];
    }
    return dates.map(date => {
      const dailyRevenue = financials
        .filter(f => f.date === date && f.type === 'Receita')
        .reduce((sum, f) => sum + f.amount, 0);
      const dailyExpense = financials
        .filter(f => f.date === date && f.type === 'Despesa')
        .reduce((sum, f) => sum + f.amount, 0);
      return {
        name: date.split('-').slice(1).reverse().join('/'), // Transforma YYYY-MM-DD em DD/MM
        Receitas: dailyRevenue,
        Despesas: dailyExpense
      };
    });
  }, [financials]);

  // Agrupamento de faturamento de O.S. por Categoria dos Produtos
  const salesByCategoryData = useMemo(() => {
    const categoryTotals = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const prod = products.find(p => p.id === item.productId);
        const category = prod ? prod.category : 'Outros';
        categoryTotals[category] = (categoryTotals[category] || 0) + item.total;
      });
    });
    const parsed = Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category]
    }));
    return parsed.length > 0 ? parsed : [{ name: 'Nenhum', value: 0 }];
  }, [orders, products]);

  // Retorna um snapshot completo do ERP para munir o Gemini de dados reais da empresa
  const getERPContextForAI = () => {
    return {
      metrics,
      activeOSList: orders.map(o => ({ id: o.id, customer: o.customerName, total: o.total, status: o.status, deliveryDate: o.deliveryDate })),
      inventoryStock: products.map(p => ({ name: p.name, stock: p.stock, minStock: p.minStock, unit: p.unit, category: p.category })),
      financialCashflow: financials.map(f => ({ type: f.type, category: f.category, description: f.description, amount: f.amount, status: f.status, date: f.date }))
    };
  };

  // Requisição segura para a API do Gemini com tratamento de erro e backoff exponencial
  const callGeminiAPI = async (userPrompt, systemPrompt, isJson = false) => {
    const apiKey = ""; // Definido como string vazia de acordo com as instruções ambientais
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    let payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    if (isJson) {
      payload.generationConfig = {
        responseMimeType: "application/json"
      };
    }

    let attempt = 0;
    let delay = 1000;
    
    while (attempt < 5) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
          throw new Error(`Erro na API Gemini: ${response.status}`);
        }
        
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          throw new Error("Resposta da IA retornou vazia");
        }
        return text;
      } catch (error) {
        attempt++;
        if (attempt >= 5) throw error;
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  };

  const handleSendCopilotMessage = async (e) => {
    if (e) e.preventDefault();
    if (!copilotInput.trim()) return;

    const userMsg = copilotInput;
    setCopilotInput('');
    setCopilotMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsCopilotLoading(true);

    try {
      const erpContext = getERPContextForAI();
      const systemInstruction = `
        Você é o Dexix Copilot, um analista financeiro, operacional e estrategista de negócios de altíssimo nível especializado em Comunicação Visual (Fachadas, Lonas, Adesivos, Serralheria, Crachás).
        Você tem acesso em tempo real aos dados atuais do ERP Dexix:
        ---
        ESTADO DO ERP:
        ${JSON.stringify(erpContext, null, 2)}
        ---
        Use essa base real para fazer análises precisas e inteligentes. Seja direto, prático, motivador e use uma linguagem profissional brasileira elegante. Se o usuário pedir ações ou insights promocionais, use o estilo arrojado da marca Dexix. 
        Formate suas respostas usando Markdown apropriado (negritos, listas e tabelas se necessário).
      `;

      const aiResponse = await callGeminiAPI(userMsg, systemInstruction);
      setCopilotMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    } catch (err) {
      console.error(err);
      setCopilotMessages(prev => [...prev, { 
        role: 'assistant', 
        text: 'Desculpe, ocorreu uma oscilação na rede ao consultar o cérebro da IA. Por favor, tente enviar novamente em instantes!' 
      }]);
    } finally {
      setIsCopilotLoading(false);
    }
  };

  const handleQuickCommand = (commandText) => {
    setCopilotInput(commandText);
    setTimeout(() => {
      // Pequeno delay para preencher o input antes do envio
      const inputEl = document.getElementById('copilot-chat-input');
      if (inputEl) inputEl.focus();
    }, 50);
  };

  const handleGenerateAiOs = async () => {
    if (!aiOsPrompt.trim()) {
      triggerToast("Digite as instruções para a O.S. Inteligente!", "error");
      return;
    }
    setIsAiOsLoading(true);
    try {
      const availableProducts = products.map(p => ({ id: p.id, name: p.name, price: p.price, unit: p.unit }));
      const prompt = `
        Com base na solicitação informal do cliente e na lista de produtos/serviços cadastrados na Dexix Comunicação Visual, monte a proposta comercial ideal estruturada exatamente como solicitado.
        
        PRODUTOS CADASTRADOS NA DEXIX:
        ${JSON.stringify(availableProducts, null, 2)}

        SOLICITAÇÃO DO CLIENTE:
        "${aiOsPrompt}"

        Você deve analisar as dimensões ou itens implícitos da solicitação (por exemplo: "lona de 3x2" equivale a 6 m² do produto correspondente à lona p1).
        Responda estritamente com um objeto JSON válido. Não adicione tags de markdown adicionais, não adicione explicações fora do JSON.
        
        FORMATO DO JSON EXIGIDO:
        {
          "items": [
            { "productId": "ID_DO_PRODUTO", "qty": NUMERO_INTEIRO_OU_DECIMAL }
          ],
          "description": "Uma bela descrição técnica, profissional e comercial detalhando o escopo do projeto, dimensões informadas, acabamento e montagem sugeridos."
        }
      `;

      const systemInstruction = "Você é o assistente de orçamento técnico da Dexix. Sua função é traduzir linguagem natural de pedidos em itens de orçamento técnico estruturados in JSON para o ERP.";
      const rawResponse = await callGeminiAPI(prompt, systemInstruction, true);
      
      // Sanitizando possível markdown do JSON caso a IA use blocos de código
      let cleanJson = rawResponse;
      if (cleanJson.includes('```')) {
        cleanJson = cleanJson.substring(cleanJson.indexOf('{'), cleanJson.lastIndexOf('}') + 1);
      }
      
      const parsed = JSON.parse(cleanJson);
      
      if (parsed.items && Array.isArray(parsed.items)) {
        // Mapear os itens para coincidir com a estrutura exigida pelo ERP
        const orderItems = parsed.items.map(aiItem => {
          const matchProd = products.find(p => p.id === aiItem.productId);
          if (matchProd) {
            return {
              productId: matchProd.id,
              productName: matchProd.name,
              qty: Number(aiItem.qty),
              unit: matchProd.unit,
              price: matchProd.price,
              total: Number(aiItem.qty) * matchProd.price
            };
          }
          return null;
        }).filter(Boolean);

        setNewOrder(prev => ({
          ...prev,
          items: orderItems,
          description: parsed.description || prev.description
        }));
        
        triggerToast("Itens e especificações técnicas gerados com sucesso pela Dexix AI!");
      } else {
        throw new Error("Formato inválido de retorno da IA");
      }
    } catch (err) {
      console.error(err);
      triggerToast("Erro ao processar orçamento pela IA. Verifique as instruções fornecidas.", "error");
    } finally {
      setIsAiOsLoading(false);
    }
  };

  const handleAprimorarMensagemComIA = async () => {
    setIsAiMsgLoading(true);
    try {
      const prompt = `
        Melhore, mude ou adapte a mensagem a seguir para o WhatsApp do cliente ${notificationTarget.name}, utilizando o tom especificado: "${aiMsgTone}".
        O contexto atual é o pedido ou atendimento de código/tema: ${notificationTarget.context}.
        Mantenha sempre os detalhes essenciais (como números de telefone, valores se houver e o nome da Dexix Comunicação). Use emojis e quebras de linha para deixar a mensagem extremamente legível no WhatsApp.

        MENSAGEM ORIGINAL:
        "${customNotificationMessage}"
      `;

      const systemInstruction = "Você é o copywriter de atendimento e marketing da Dexix Comunicação Visual. Seu objetivo é engajar clientes por WhatsApp usando comunicação direta, empática e focada na excelência visual.";
      const refinedMessage = await callGeminiAPI(prompt, systemInstruction);
      setCustomNotificationMessage(refinedMessage);
      triggerToast("Texto aprimorado com sucesso pela Dexix AI!");
    } catch (err) {
      console.error(err);
      triggerToast("Falha ao aprimorar mensagem com IA.", "error");
    } finally {
      setIsAiMsgLoading(false);
    }
  };

  // --- MÉTODOS DE CADASTRO E FLUXO TRADICIONAL ---
  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.phone) {
      triggerToast("Nome e Telefone são campos obrigatórios!", "error");
      return;
    }
    const customerToAdd = {
      ...newCustomer,
      id: 'c' + (customers.length + 1),
      ordersCount: 0
    };
    setCustomers([...customers, customerToAdd]);
    setIsCustomerModalOpen(false);
    setNewCustomer({ name: '', contact: '', phone: '', email: '', city: '', status: 'Ativo' });
    triggerToast("Cliente cadastrado com sucesso!");
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.price <= 0) {
      triggerToast("Preencha o nome e um preço válido!", "error");
      return;
    }
    const productToAdd = {
      ...newProduct,
      id: 'p' + (products.length + 1),
      stock: Number(newProduct.stock),
      cost: Number(newProduct.cost),
      price: Number(newProduct.price),
      minStock: Number(newProduct.minStock)
    };
    setProducts([...products, productToAdd]);
    setIsProductModalOpen(false);
    setNewProduct({ name: '', category: 'Lonas/Mídias', stock: 0, unit: 'm²', cost: 0, price: 0, minStock: 5 });
    triggerToast("Produto/Insumo adicionado ao estoque!");
  };

  const handleAddItemToOrder = () => {
    if (!newOrder.tempProductId) {
      triggerToast("Selecione um produto para adicionar!", "error");
      return;
    }
    const selectedProd = products.find(p => p.id === newOrder.tempProductId);
    if (!selectedProd) return;

    const existingItemIdx = newOrder.items.findIndex(item => item.productId === selectedProd.id);
    if (existingItemIdx > -1) {
      const updatedItems = [...newOrder.items];
      updatedItems[existingItemIdx].qty += Number(newOrder.tempQty);
      updatedItems[existingItemIdx].total = updatedItems[existingItemIdx].qty * updatedItems[existingItemIdx].price;
      setNewOrder({ ...newOrder, items: updatedItems, tempProductId: '', tempQty: 1 });
    } else {
      const newItem = {
        productId: selectedProd.id,
        productName: selectedProd.name,
        qty: Number(newOrder.tempQty),
        unit: selectedProd.unit,
        price: selectedProd.price,
        total: Number(newOrder.tempQty) * selectedProd.price
      };
      setNewOrder({
        ...newOrder,
        items: [...newOrder.items, newItem],
        tempProductId: '',
        tempQty: 1
      });
    }
  };

  const handleRemoveItemFromOrder = (index) => {
    const updatedItems = [...newOrder.items];
    updatedItems.splice(index, 1);
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!newOrder.customerId) {
      triggerToast("Selecione o cliente para gerar a OS!", "error");
      return;
    }
    if (newOrder.items.length === 0) {
      triggerToast("Adicione pelo menos um item/serviço à OS!", "error");
      return;
    }

    const customer = customers.find(c => c.id === newOrder.customerId);
    const calculatedTotal = newOrder.items.reduce((sum, item) => sum + item.total, 0);

    const finalOrder = {
      id: 'OS-' + (1000 + orders.length + 25),
      customerId: newOrder.customerId,
      customerName: customer ? customer.name : 'Cliente Avulso',
      items: newOrder.items,
      total: calculatedTotal,
      status: newOrder.status,
      date: new Date().toISOString().split('T')[0],
      deliveryDate: newOrder.deliveryDate || new Date(Date.now() + 5*24*60*60*1000).toISOString().split('T')[0],
      description: newOrder.description
    };

    setOrders([finalOrder, ...orders]);

    if (newOrder.status !== 'Orçamento') {
      const newTransaction = {
        id: 'f' + (financials.length + 1),
        type: 'Receita',
        category: 'Venda de Serviços',
        description: `OS Gerada: ${finalOrder.id} - ${finalOrder.customerName}`,
        amount: calculatedTotal,
        date: finalOrder.date,
        status: 'Pendente'
      };
      setFinancials([newTransaction, ...financials]);
    }

    setCustomers(customers.map(c => c.id === newOrder.customerId ? { ...c, ordersCount: c.ordersCount + 1 } : c));
    setIsOrderModalOpen(false);
    setNewOrder({ customerId: '', items: [], status: 'Pendente', deliveryDate: '', description: '', tempProductId: '', tempQty: 1 });
    triggerToast(`Ordem de Serviço ${finalOrder.id} gerada com sucesso!`);
  };

  const handleAddFinancial = (e) => {
    e.preventDefault();
    if (!newFinancial.description || newFinancial.amount <= 0 || !newFinancial.date) {
      triggerToast("Preencha todos os campos corretamente!", "error");
      return;
    }

    const transaction = {
      ...newFinancial,
      id: 'f' + (financials.length + 1),
      amount: Number(newFinancial.amount)
    };

    setFinancials([transaction, ...financials]);
    setIsFinancialModalOpen(false);
    setNewFinancial({ type: 'Receita', category: 'Venda de Serviços', description: '', amount: 0, date: '', status: 'Pendente' });
    triggerToast("Lançamento financeiro consolidado!");
  };

  // Métodos de gerenciamento de logins/usuários
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      triggerToast("Preencha todos os dados do novo usuário!", "error");
      return;
    }
    const initials = newUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const userToAdd = {
      id: 'u' + (users.length + 1),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      avatar: initials
    };
    setUsers([...users, userToAdd]);
    setNewUser({ name: '', email: '', password: '', role: 'Vendedor', status: 'Ativo' });
    triggerToast(`Usuário ${userToAdd.name} registrado com sucesso!`);
  };

  const openWhatsAppSimulator = (customerName, phone, orderId, orderStatus) => {
    const msg = `Olá, ${customerName}! Aqui é da Dexix Comunicação. O status do seu pedido ${orderId} foi atualizado para: *${orderStatus}*. Fale conosco se precisar! 🚀`;
    setNotificationTarget({ name: customerName, phone, context: orderId });
    setCustomNotificationMessage(msg);
    setNotificationStatusMsg('');
    setIsNotificationModalOpen(true);
  };

  const handleSendMockWhatsApp = () => {
    setNotificationStatusMsg('Enviando...');
    setTimeout(() => {
      setNotificationStatusMsg('Sucesso!');
      triggerToast(`Mensagem enviada com sucesso para o número ${notificationTarget.phone}!`);
      setTimeout(() => {
        setIsNotificationModalOpen(false);
      }, 1000);
    }, 1500);
  };

  // Real WhatsApp Redirect
  const handleSendRealWhatsApp = () => {
    // Clean non-digits from phone
    let cleanPhone = notificationTarget.phone.replace(/\D/g, '');
    // Assume Brazilian country code (55) if it starts with state code e.g. 98...
    if (cleanPhone.length === 11 || cleanPhone.length === 10) {
      cleanPhone = '55' + cleanPhone;
    }
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(customNotificationMessage)}`;
    window.open(url, '_blank');
    triggerToast("Redirecionando para o WhatsApp Web...");
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    triggerToast(`Status da OS ${orderId} alterado para ${newStatus}!`);
  };

  return (
    <div className={`min-h-screen ${BRAND_COLORS.darkBg} text-slate-100 font-sans flex flex-col md:flex-row relative overflow-x-hidden`}>
      
      {/* TOAST NOTIFICATION CONTAINER */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce shadow-2xl flex items-center gap-3 p-4 rounded-xl border border-[#39FF14] bg-[#17122c]">
          <div className="w-3 h-3 rounded-full bg-[#39FF14]" />
          <span className="font-semibold text-white">{toast.message}</span>
        </div>
      )}

      {/* SIDEBAR OPERACIONAL */}
      <aside className="w-full md:w-64 shrink-0 bg-[#120e24] border-b md:border-b-0 md:border-r border-[#7A22FF]/20 p-5 flex flex-col justify-between">
        <div>
          <DexixLogo />

          {/* BOX DO USUÁRIO LOGADO */}
          <div className="mt-6 bg-[#17122c] border border-purple-950/60 p-3 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#7A22FF] text-white flex items-center justify-center font-extrabold text-sm border border-[#39FF14]/30 shadow-md">
              {currentUser.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
              <span className="text-[9px] text-[#39FF14] uppercase tracking-wider font-extrabold block">
                {currentUser.role}
              </span>
            </div>
          </div>
          
          <nav className="mt-6 space-y-1.5">
            <button 
              onClick={() => { setActiveTab('dashboard'); setSearchQuery(''); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition ${activeTab === 'dashboard' ? 'bg-[#7A22FF] text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:bg-purple-950/20 hover:text-white'}`}
            >
              <TrendingUp size={16} />
              Painel de Gestão
            </button>
            <button 
              onClick={() => { setActiveTab('clientes'); setSearchQuery(''); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition ${activeTab === 'clientes' ? 'bg-[#7A22FF] text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:bg-purple-950/20 hover:text-white'}`}
            >
              <Users size={16} />
              CRM / Clientes
            </button>
            <button 
              onClick={() => { setActiveTab('estoque'); setSearchQuery(''); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition ${activeTab === 'estoque' ? 'bg-[#7A22FF] text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:bg-purple-950/20 hover:text-white'}`}
            >
              <Package size={16} />
              Estoque de Insumos
            </button>
            <button 
              onClick={() => { setActiveTab('vendas'); setSearchQuery(''); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition ${activeTab === 'vendas' ? 'bg-[#7A22FF] text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:bg-purple-950/20 hover:text-white'}`}
            >
              <FileText size={16} />
              Ordens de Serviço (OS)
            </button>
            <button 
              onClick={() => { setActiveTab('financeiro'); setSearchQuery(''); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition ${activeTab === 'financeiro' ? 'bg-[#7A22FF] text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:bg-purple-950/20 hover:text-white'}`}
            >
              <DollarSign size={16} />
              Financeiro DRE
            </button>
            <button 
              onClick={() => { setActiveTab('usuarios'); setSearchQuery(''); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition ${activeTab === 'usuarios' ? 'bg-[#7A22FF] text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:bg-purple-950/20 hover:text-white'}`}
            >
              <UserCheck size={16} />
              Logins e Usuários
            </button>
          </nav>

          {/* BOTÃO DO COPILOT DE INTELIGÊNCIA ARTIFICIAL */}
          <div className="mt-6">
            <button 
              onClick={() => setIsCopilotOpen(true)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl font-extrabold text-[#39FF14] bg-[#7A22FF]/20 border border-[#39FF14]/30 hover:border-[#39FF14] transition shadow-md shadow-[#39FF14]/5 animate-pulse"
            >
              <span className="flex items-center gap-2 text-xs">
                <Sparkles size={16} className="text-[#39FF14]" />
                Dexix Copilot
              </span>
              <span className="bg-[#39FF14]/20 text-[9px] uppercase font-bold text-[#39FF14] px-1 py-0.5 rounded border border-[#39FF14]/30">IA</span>
            </button>
          </div>
        </div>

        {/* Rodapé da Sidebar */}
        <div className="mt-8 pt-4 border-t border-purple-900/40 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2">
            <Instagram size={14} className="text-[#39FF14]" />
            <span>@dexixcomunicacao</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-[#39FF14]" />
            <span>(98) 98420-2633</span>
          </div>
          <p className="text-[10px] text-slate-500 font-semibold tracking-wider">Dexix ERP • Inteligência Artificial</p>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        
        {/* HEADER GERAL */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/30 pb-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white capitalize flex items-center gap-2">
              {activeTab === 'usuarios' ? 'Logins e Usuários' : activeTab === 'dashboard' ? 'Painel Executivo' : activeTab}
              {activeTab === 'dashboard' && <Sparkles className="text-[#39FF14] inline-block animate-bounce" size={18} />}
            </h2>
            <p className="text-sm text-slate-400">
              Gerenciamento integrado de alta performance • Dexix Comunicação Visual
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setIsOrderModalOpen(true)} 
              className="bg-[#7A22FF] hover:bg-[#6819e6] text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition text-sm"
            >
              <Plus size={16} /> Nova O.S.
            </button>
            <button 
              onClick={() => setIsCustomerModalOpen(true)} 
              className="bg-transparent border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14]/10 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition text-sm"
            >
              <Users size={16} /> Novo Cliente
            </button>
          </div>
        </header>

        {/* CONTAINER DA ABA: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* GRID DE MÉTRICAS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#7A22FF]/5 rounded-bl-full pointer-events-none" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Faturamento Consolidado</span>
                <span className="text-2xl font-extrabold text-white mt-1 block">
                  R$ {metrics.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#39FF14] mt-3">
                  <TrendingUp size={14} />
                  <span>+14% em relação ao mês anterior</span>
                </div>
              </div>

              <div className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl relative overflow-hidden">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Despesas Operacionais</span>
                <span className="text-2xl font-extrabold text-pink-500 mt-1 block">
                  R$ {metrics.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-3">
                  <span>Insumos, serralheria e fixas</span>
                </div>
              </div>

              <div className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl relative overflow-hidden">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Saldo de Caixa Atual</span>
                <span className={`text-2xl font-extrabold mt-1 block ${metrics.balance >= 0 ? 'text-[#39FF14]' : 'text-red-500'}`}>
                  R$ {metrics.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-3">
                  <span>Fluxo líquido e conciliação</span>
                </div>
              </div>

              <div className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl relative overflow-hidden">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Contas a Receber</span>
                <span className="text-2xl font-extrabold text-cyan-400 mt-1 block">
                  R$ {metrics.receivable.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#39FF14] mt-3">
                  <span>Ordens pendentes e em aberto</span>
                </div>
              </div>
            </section>

            {/* ALERTAS DE FLUXO E OPERAÇÕES */}
            {(metrics.lowStock > 0 || metrics.activeOS > 0) && (
              <div className="bg-[#17122c] border-l-4 border-yellow-500 p-4 rounded-r-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="text-yellow-500 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Alertas Operacionais Pendentes</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Você tem <span className="text-yellow-500 font-bold">{metrics.lowStock}</span> insumo(s) com estoque abaixo do mínimo e <span className="text-[#39FF14] font-bold">{metrics.activeOS}</span> Ordens de Serviço ativas sob produção.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('estoque')} 
                  className="bg-yellow-500/10 hover:bg-yellow-500/25 text-yellow-500 text-xs font-bold px-3 py-1.5 rounded-lg transition"
                >
                  Verificar Estoque
                </button>
              </div>
            )}

            {/* GRÁFICOS DE BI DO PAINEL */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-white text-lg">Evolução do Fluxo Financeiro</h3>
                    <p className="text-xs text-slate-400">Receitas e despesas consolidadas de Junho</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-[#39FF14]"><span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Receitas</span>
                    <span className="flex items-center gap-1.5 text-pink-500"><span className="w-2 h-2 rounded-full bg-pink-500" /> Despesas</span>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={financialChartData}>
                      <defs>
                        <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#39FF14" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#39FF14" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#251c44" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#17122c', borderColor: '#4a148c' }} />
                      <Area type="monotone" dataKey="Receitas" stroke="#39FF14" strokeWidth={2} fillOpacity={1} fill="url(#colorReceitas)" />
                      <Area type="monotone" dataKey="Despesas" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorDespesas)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Distribuição por Categoria */}
              <div className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl">
                <h3 className="font-bold text-white text-lg mb-1">OS por Categoria</h3>
                <p className="text-xs text-slate-400 mb-6">Faturamento segmentado por tipo de serviço</p>
                <div className="h-56 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByCategoryData.length > 0 ? salesByCategoryData : [{ name: 'Sem Vendas', value: 1 }]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {(salesByCategoryData.length > 0 ? salesByCategoryData : [{ name: 'Sem Vendas', value: 1 }]).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#17122c', borderColor: '#4a148c' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  {salesByCategoryData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <span className="truncate text-slate-300">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TABELA DE O.S. RECENTES */}
            <section className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-white text-lg">Ordens de Serviço em Aberto</h3>
                  <p className="text-xs text-slate-400">Acompanhamento de processos e prazos de entrega</p>
                </div>
                <button 
                  onClick={() => setActiveTab('vendas')} 
                  className="text-[#39FF14] hover:underline text-xs font-bold flex items-center gap-1"
                >
                  Ver Todas <ChevronRight size={14} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-purple-900/30 text-slate-400 text-xs">
                      <th className="py-3 px-4">Cód / OS</th>
                      <th className="py-3 px-4">Cliente</th>
                      <th className="py-3 px-4">Data Registro</th>
                      <th className="py-3 px-4">Prazo Entrega</th>
                      <th className="py-3 px-4 text-right">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Notificação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/10">
                    {orders.slice(0, 5).map((order) => {
                      const client = customers.find(c => c.id === order.customerId);
                      return (
                        <tr key={order.id} className="hover:bg-purple-950/10 transition">
                          <td className="py-3.5 px-4 font-bold text-slate-200">{order.id}</td>
                          <td className="py-3.5 px-4 font-semibold text-white">{order.customerName}</td>
                          <td className="py-3.5 px-4 text-slate-300">{order.date}</td>
                          <td className="py-3.5 px-4 text-slate-300">{order.deliveryDate}</td>
                          <td className="py-3.5 px-4 text-right font-extrabold text-[#39FF14]">
                            R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
                              order.status === 'Concluído' ? 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30' :
                              order.status === 'Produzindo' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                              'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button 
                              onClick={() => openWhatsAppSimulator(order.customerName, client?.phone || '98984202633', order.id, order.status)}
                              className="bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 p-2 rounded-xl transition inline-flex items-center"
                              title="Notificar via WhatsApp"
                            >
                              <MessageSquare size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* CONTAINER DA ABA: CRM/CLIENTES */}
        {activeTab === 'clientes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar clientes por nome, contato ou cidade..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#17122c] border border-purple-950/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7A22FF]"
                />
              </div>
              <button 
                onClick={() => setIsCustomerModalOpen(true)}
                className="bg-[#7A22FF] hover:bg-[#6819e6] text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >
                <Plus size={18} /> Novo Cliente
              </button>
            </div>

            <div className="bg-[#17122c] border border-purple-950/60 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-purple-900/30 text-slate-400 text-xs">
                      <th className="py-3.5 px-5">Nome do Cliente</th>
                      <th className="py-3.5 px-5">Contato / Responsável</th>
                      <th className="py-3.5 px-5">Telefone / WhatsApp</th>
                      <th className="py-3.5 px-5">Cidade</th>
                      <th className="py-3.5 px-5 text-center">Atendimentos/OS</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/10">
                    {customers
                      .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.city.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((customer) => (
                        <tr key={customer.id} className="hover:bg-purple-950/10 transition">
                          <td className="py-4 px-5 font-bold text-white">{customer.name}</td>
                          <td className="py-4 px-5 text-slate-300">{customer.contact}</td>
                          <td className="py-4 px-5 text-slate-300 font-mono">{customer.phone}</td>
                          <td className="py-4 px-5 text-slate-400">{customer.city}</td>
                          <td className="py-4 px-5 text-center font-bold text-indigo-400">{customer.ordersCount}</td>
                          <td className="py-4 px-5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${customer.status === 'Ativo' ? 'bg-[#39FF14]/10 text-[#39FF14]' : 'bg-red-500/10 text-red-400'}`}>
                              {customer.status}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-center space-x-2">
                            <button 
                              onClick={() => openWhatsAppSimulator(customer.name, customer.phone, 'Atendimento', 'Contato Comercial')}
                              className="bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 p-2 rounded-xl transition inline-flex"
                              title="Chamar no WhatsApp"
                            >
                              <MessageSquare size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                setCustomers(customers.filter(c => c.id !== customer.id));
                                triggerToast("Cliente removido!");
                              }}
                              className="bg-red-500/10 text-red-400 hover:bg-red-500/20 p-2 rounded-xl transition inline-flex"
                              title="Excluir"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CONTAINER DA ABA: ESTOQUE */}
        {activeTab === 'estoque' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar insumos e materiais..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#17122c] border border-purple-950/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7A22FF]"
                />
              </div>
              <button 
                onClick={() => setIsProductModalOpen(true)}
                className="bg-[#7A22FF] hover:bg-[#6819e6] text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >
                <Plus size={18} /> Novo Material
              </button>
            </div>

            <div className="bg-[#17122c] border border-purple-950/60 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-purple-900/30 text-slate-400 text-xs">
                      <th className="py-3.5 px-5">Material / Insumo</th>
                      <th className="py-3.5 px-5">Categoria</th>
                      <th className="py-3.5 px-5 text-right">Estoque Atual</th>
                      <th className="py-3.5 px-5 text-center">Unidade</th>
                      <th className="py-3.5 px-5 text-right">Custo Unit.</th>
                      <th className="py-3.5 px-5 text-right">Preço de Venda</th>
                      <th className="py-3.5 px-5 text-center">Status Estoque</th>
                      <th className="py-3.5 px-5 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/10">
                    {products
                      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((product) => {
                        const isLow = product.stock <= product.minStock;
                        return (
                          <tr key={product.id} className="hover:bg-purple-950/10 transition">
                            <td className="py-4 px-5 font-bold text-white">{product.name}</td>
                            <td className="py-4 px-5 text-slate-300">{product.category}</td>
                            <td className={`py-4 px-5 text-right font-bold ${isLow ? 'text-yellow-500' : 'text-slate-100'}`}>
                              {product.stock}
                            </td>
                            <td className="py-4 px-5 text-center text-slate-400">{product.unit}</td>
                            <td className="py-4 px-5 text-right text-slate-300">
                              R$ {product.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="py-4 px-5 text-right font-extrabold text-[#39FF14]">
                              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="py-4 px-5 text-center">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${isLow ? 'bg-yellow-500/10 text-yellow-500' : 'bg-[#39FF14]/10 text-[#39FF14]'}`}>
                                {isLow ? 'Estoque Baixo' : 'Estoque Saudável'}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-center space-x-2">
                              <button 
                                onClick={() => {
                                  setProducts(products.map(p => p.id === product.id ? { ...p, stock: p.stock + 10 } : p));
                                  triggerToast("Adicionado 10 unidades ao estoque!");
                                }}
                                className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 p-2 rounded-xl transition inline-flex"
                                title="+10 Estoque Rápido"
                              >
                                <Plus size={16} />
                              </button>
                              <button 
                                onClick={() => {
                                  setProducts(products.filter(p => p.id !== product.id));
                                  triggerToast("Material removido!");
                                }}
                                className="bg-red-500/10 text-red-400 hover:bg-red-500/20 p-2 rounded-xl transition inline-flex"
                                title="Excluir"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CONTAINER DA ABA: ORDENS DE SERVIÇO */}
        {activeTab === 'vendas' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#17122c] border border-purple-950/60 p-4 rounded-2xl">
              <div className="flex flex-wrap items-center gap-2">
                {['Todos', 'Pendente', 'Produzindo', 'Concluído', 'Orçamento'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                      filterStatus === status ? 'bg-[#7A22FF] text-white' : 'text-slate-400 hover:bg-purple-950/20'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Pesquisar OS ou Cliente..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#120e24] border border-purple-950/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders
                .filter(o => filterStatus === 'Todos' || o.status === filterStatus)
                .filter(o => o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((order) => {
                  const client = customers.find(c => c.id === order.customerId);
                  return (
                    <div key={order.id} className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl flex flex-col justify-between hover:border-purple-500/40 transition">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs text-slate-400">Reg: {order.date}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                            order.status === 'Concluído' ? 'bg-[#39FF14]/10 text-[#39FF14]' :
                            order.status === 'Produzindo' ? 'bg-purple-500/10 text-purple-400' :
                            'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {order.status}
                          </span>
                        </div>

                        <h4 className="font-bold text-white text-lg">{order.id}</h4>
                        <p className="text-slate-300 font-semibold mt-1">{order.customerName}</p>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 italic">"{order.description}"</p>

                        <div className="mt-4 pt-4 border-t border-purple-900/20 space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-300">
                            <span>Prazo Final:</span>
                            <span className="font-bold">{order.deliveryDate}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-300">
                            <span>Itens:</span>
                            <span className="font-bold">{order.items.reduce((sum, item) => sum + item.qty, 0)} un/m²</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs text-slate-400">Total Geral:</span>
                          <span className="text-xl font-black text-[#39FF14]">
                            R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <button 
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsViewOrderModalOpen(true);
                            }}
                            className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-bold py-2 rounded-xl text-xs transition"
                          >
                            Detalhes
                          </button>
                          <button 
                            onClick={() => {
                              const nextStatus = order.status === 'Pendente' ? 'Produzindo' : 'Concluído';
                              handleUpdateOrderStatus(order.id, nextStatus);
                            }}
                            className="bg-[#7A22FF]/20 hover:bg-[#7A22FF]/40 text-purple-200 font-bold py-2 rounded-xl text-xs transition"
                          >
                            Avançar
                          </button>
                          <button 
                            onClick={() => openWhatsAppSimulator(order.customerName, client?.phone || '98984202633', order.id, order.status)}
                            className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1"
                          >
                            <MessageSquare size={14} /> Zap
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* CONTAINER DA ABA: FINANCEIRO */}
        {activeTab === 'financeiro' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-lg">Demonstração de Resultados (DRE / Fluxo)</h3>
                <p className="text-xs text-slate-400">Movimentações, pagamentos e recebimentos registrados</p>
              </div>
              <button 
                onClick={() => setIsFinancialModalOpen(true)}
                className="bg-[#7A22FF] hover:bg-[#6819e6] text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >
                <Plus size={18} /> Novo Lançamento
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl">
                <span className="text-xs font-bold text-slate-400 uppercase block">Total Recebido</span>
                <span className="text-2xl font-black text-[#39FF14] mt-1 block">
                  R$ {metrics.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl">
                <span className="text-xs font-bold text-slate-400 uppercase block">Total Despendido</span>
                <span className="text-2xl font-black text-pink-500 mt-1 block">
                  R$ {metrics.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl">
                <span className="text-xs font-bold text-slate-400 uppercase block">Lucro Líquido Real</span>
                <span className={`text-2xl font-black mt-1 block ${metrics.balance >= 0 ? 'text-[#39FF14]' : 'text-red-500'}`}>
                  R$ {metrics.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-[#17122c] border border-purple-950/60 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-purple-900/30 text-slate-400 text-xs">
                      <th className="py-3.5 px-5">Data Lançamento</th>
                      <th className="py-3.5 px-5">Tipo</th>
                      <th className="py-3.5 px-5">Categoria de Conta</th>
                      <th className="py-3.5 px-5">Descrição / Justificativa</th>
                      <th className="py-3.5 px-5 text-right">Valor</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/10">
                    {financials.map((item) => (
                      <tr key={item.id} className="hover:bg-purple-950/10 transition">
                        <td className="py-4 px-5 text-slate-300">{item.date}</td>
                        <td className="py-4 px-5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.type === 'Receita' ? 'bg-[#39FF14]/10 text-[#39FF14]' : 'bg-pink-500/10 text-pink-400'}`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-slate-300 font-semibold">{item.category}</td>
                        <td className="py-4 px-5 text-slate-400 max-w-xs truncate">{item.description}</td>
                        <td className={`py-4 px-5 text-right font-black ${item.type === 'Receita' ? 'text-[#39FF14]' : 'text-pink-500'}`}>
                          R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-4 px-5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'Pago' ? 'bg-[#39FF14]/10 text-[#39FF14]' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-center">
                          {item.status === 'Pendente' && (
                            <button 
                              onClick={() => {
                                setFinancials(financials.map(f => f.id === item.id ? { ...f, status: 'Pago' } : f));
                                triggerToast("Lançamento quitado!");
                              }}
                              className="bg-[#39FF14]/10 text-[#39FF14] hover:bg-[#39FF14]/20 px-3 py-1.5 rounded-xl text-xs font-bold transition"
                            >
                              Conciliar
                            </button>
                          )}
                          {item.status === 'Pago' && (
                            <button 
                              onClick={() => {
                                setFinancials(financials.filter(f => f.id !== item.id));
                                triggerToast("Lançamento removido.");
                              }}
                              className="text-red-400 hover:text-red-500 p-2 rounded-xl transition inline-flex"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CONTAINER DA ABA: LOGINS E USUÁRIOS */}
        {activeTab === 'usuarios' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* PAINEL DE CRIAÇÃO DE LOGIN */}
              <div className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <UserPlus size={20} className="text-[#39FF14]" />
                  <h3 className="font-bold text-white text-lg">Criar Novo Login</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Registre um novo operador com credenciais de acesso exclusivas e papéis específicos no Dexix ERP.
                </p>

                <form onSubmit={handleCreateUser} className="space-y-4 pt-2">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Ex: João da Silva"
                      className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#7A22FF]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">E-mail de Login</label>
                    <input 
                      type="email" 
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="Ex: joao@dexix.com.br"
                      className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#7A22FF]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Senha de Acesso</label>
                    <input 
                      type="password" 
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#7A22FF]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Nível de Acesso</label>
                      <select 
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Administrador">Administrador</option>
                        <option value="Financeiro">Financeiro</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Produção">Produção</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Status Inicial</label>
                      <select 
                        value={newUser.status}
                        onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                        className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#39FF14] hover:bg-[#2ee010] text-black font-extrabold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 mt-4"
                  >
                    <UserPlus size={16} /> Salvar Usuário
                  </button>
                </form>
              </div>

              {/* LISTAGEM E CONTROLE DE PERMISSÕES */}
              <div className="bg-[#17122c] border border-purple-950/60 p-5 rounded-2xl lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock size={20} className="text-[#39FF14]" />
                    <h3 className="font-bold text-white text-lg">Usuários Cadastrados</h3>
                  </div>
                  <span className="bg-purple-950 text-purple-300 font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-purple-900/50">
                    {users.length} Logins Disponíveis
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-purple-900/30 text-slate-400">
                        <th className="py-3 px-2">Usuário</th>
                        <th className="py-3 px-2">E-mail</th>
                        <th className="py-3 px-2">Nível</th>
                        <th className="py-3 px-2 text-center">Status</th>
                        <th className="py-3 px-2 text-center">Simular Login</th>
                        <th className="py-3 px-2 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-900/10">
                      {users.map((user) => {
                        const isLogged = currentUser.id === user.id;
                        return (
                          <tr key={user.id} className={`hover:bg-purple-950/10 transition ${isLogged ? 'bg-[#7A22FF]/5' : ''}`}>
                            <td className="py-3 px-2 flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-purple-950 border border-purple-900/50 text-slate-300 font-bold flex items-center justify-center">
                                {user.avatar}
                              </div>
                              <div>
                                <span className="font-bold text-white block">{user.name}</span>
                                {isLogged && <span className="text-[9px] text-[#39FF14] font-semibold">Ativo agora</span>}
                              </div>
                            </td>
                            <td className="py-3 px-2 text-slate-400 font-mono">{user.email}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider ${
                                user.role === 'Administrador' ? 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20' :
                                user.role === 'Financeiro' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                                user.role === 'Produção' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-center">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${user.status === 'Ativo' ? 'bg-[#39FF14]/10 text-[#39FF14]' : 'bg-red-500/10 text-red-400'}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-center">
                              <button 
                                onClick={() => {
                                  setCurrentUser(user);
                                  triggerToast(`Sessão alterada para ${user.name}!`);
                                }}
                                className={`text-[10px] font-extrabold px-3 py-1 rounded-lg transition ${
                                  isLogged 
                                    ? 'bg-[#39FF14] text-black cursor-default' 
                                    : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/60'
                                }`}
                                disabled={isLogged}
                              >
                                {isLogged ? 'Conectado' : 'Alternar'}
                              </button>
                            </td>
                            <td className="py-3 px-2 text-right">
                              <button 
                                onClick={() => {
                                  if (user.id === 'u1') {
                                    triggerToast("Não é possível excluir o Administrador Master!", "error");
                                    return;
                                  }
                                  if (isLogged) {
                                    triggerToast("Você não pode excluir o usuário logado na sessão!", "error");
                                    return;
                                  }
                                  setUsers(users.filter(u => u.id !== user.id));
                                  triggerToast("Login de acesso removido!");
                                }}
                                className="text-red-400 hover:text-red-500 p-1.5 rounded transition"
                                title="Excluir Usuário"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* PAINEL INFORMATIVO DE PERMISSÕES DO DEXIX ERP */}
                <div className="bg-[#120e24] p-4 rounded-xl border border-purple-900/20 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Níveis de Acesso e Escopo:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-300">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="text-[#39FF14] shrink-0 mt-0.5" size={14} />
                      <div>
                        <strong className="text-white block">Administrador / Master</strong>
                        Acesso irrestrito a faturamento, estoque, CRM, DRE financeiro e gerenciamento de novos usuários.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="text-cyan-400 shrink-0 mt-0.5" size={14} />
                      <div>
                        <strong className="text-white block">Financeiro / Contabilidade</strong>
                        Foco total no fluxo de caixa, conciliação do DRE, faturamento de ordens de serviço pagas e compras de materiais.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="text-purple-400 shrink-0 mt-0.5" size={14} />
                      <div>
                        <strong className="text-white block">Produção / Serralheria e Impressão</strong>
                        Acesso às especificações técnicas das ordens de serviço, insumos de produção e avanço de status das obras.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="text-yellow-500 shrink-0 mt-0.5" size={14} />
                      <div>
                        <strong className="text-white block">Vendedor / Comercial</strong>
                        Elaboração de orçamentos, cadastro de clientes via CRM e geração inicial de propostas comerciais.
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* ========================================== */}
      {/* GLOWING SLIDE-OVER: DEXIX COPILOT (IA)     */}
      {/* ========================================== */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#120e24] border-l border-purple-500/30 shadow-2xl flex flex-col justify-between transition-transform duration-300 ${isCopilotOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-purple-900/30 flex items-center justify-between bg-[#17122c]">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#7A22FF]/20 p-2 rounded-xl border border-[#39FF14]/30">
              <Sparkles className="text-[#39FF14] animate-pulse" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Dexix Copilot</h3>
              <p className="text-[10px] text-[#39FF14] uppercase tracking-wider font-extrabold">Estrategista de Negócios AI</p>
            </div>
          </div>
          <button 
            onClick={() => setIsCopilotOpen(false)}
            className="text-slate-400 hover:text-white p-2 hover:bg-purple-950/20 rounded-xl transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Histórico do Chat */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-900">
          {copilotMessages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <span className="text-[10px] text-slate-500 mb-1 capitalize">{msg.role === 'user' ? 'Você' : 'Copilot AI'}</span>
              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-[#7A22FF] text-white rounded-tr-none' : 'bg-[#17122c] border border-purple-950/60 text-slate-200 rounded-tl-none'}`}>
                {msg.text.split('\n').map((line, lIdx) => (
                  <p key={lIdx} className={line.trim() === '' ? 'h-2' : 'mb-1'}>
                    {/* Renderização de negritos simples via Markdown artificial */}
                    {line.split('**').map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-[#39FF14]">{part}</strong> : part)}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {isCopilotLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2 bg-purple-950/10 rounded-xl max-w-xs border border-purple-900/10">
              <Loader2 className="animate-spin text-[#39FF14]" size={16} />
              <span>Analisando bases do ERP...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Sugestões Rápidas de Comando baseados no ERP */}
        <div className="p-4 bg-[#17122c] border-t border-purple-900/30 space-y-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Comandos Inteligentes Rápidos:</span>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleQuickCommand("Quais materiais estão com estoque baixo e qual a recomendação de compra baseada em fluxo?")}
              className="bg-purple-950/40 hover:bg-purple-950/70 text-slate-300 text-[10px] px-2.5 py-1.5 rounded-lg border border-purple-900/30 transition text-left"
            >
              📦 Alerta de Estoque
            </button>
            <button 
              onClick={() => handleQuickCommand("Como posso aumentar meu faturamento? Me dê 3 ideias de marketing com foco em fachadas comercializadas em São Luís.")}
              className="bg-purple-950/40 hover:bg-purple-950/70 text-slate-300 text-[10px] px-2.5 py-1.5 rounded-lg border border-purple-900/30 transition text-left"
            >
              🚀 Ideias de Captação
            </button>
            <button 
              onClick={() => handleQuickCommand("Faça um resumo executivo rápido da saúde financeira da Dexix Comunicação.")}
              className="bg-purple-950/40 hover:bg-purple-950/70 text-slate-300 text-[10px] px-2.5 py-1.5 rounded-lg border border-purple-900/30 transition text-left"
            >
              💰 Diagnóstico DRE
            </button>
          </div>

          <form onSubmit={handleSendCopilotMessage} className="flex gap-2 pt-2">
            <input 
              id="copilot-chat-input"
              type="text" 
              placeholder="Pergunte ao Copilot..." 
              value={copilotInput}
              onChange={(e) => setCopilotInput(e.target.value)}
              className="flex-1 bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#39FF14]"
            />
            <button 
              type="submit"
              disabled={isCopilotLoading}
              className="bg-[#39FF14] hover:bg-[#2ee010] text-black font-extrabold p-2.5 rounded-xl transition flex items-center justify-center disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL: NOVO CLIENTE                        */}
      {/* ========================================== */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#17122c] border border-purple-900/50 w-full max-w-md p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="text-[#39FF14]" /> Cadastrar Novo Cliente
              </h3>
              <button onClick={() => setIsCustomerModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Razão Social / Nome Fantasia *</label>
                <input 
                  type="text" 
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#7A22FF]"
                  placeholder="Ex: TAPEGÁS"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Contato / Responsável</label>
                <input 
                  type="text" 
                  value={newCustomer.contact}
                  onChange={(e) => setNewCustomer({ ...newCustomer, contact: e.target.value })}
                  className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none"
                  placeholder="Ex: Sr. Renato Silva"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">WhatsApp / Telefone *</label>
                  <input 
                    type="text" 
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none"
                    placeholder="98984202633"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Cidade</label>
                  <input 
                    type="text" 
                    value={newCustomer.city}
                    onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none"
                    placeholder="São Luís"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Endereço de E-mail</label>
                <input 
                  type="email" 
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none"
                  placeholder="cliente@provedor.com"
                />
              </div>
              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsCustomerModalOpen(false)} 
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-[#39FF14] text-black font-extrabold px-5 py-2 rounded-xl text-sm hover:bg-[#2ee010]"
                >
                  Confirmar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: NOVO PRODUTO/INSUMO                 */}
      {/* ========================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#17122c] border border-purple-900/50 w-full max-w-md p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Package className="text-[#39FF14]" /> Adicionar Produto / Insumo
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Descrição do Material *</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none"
                  placeholder="Ex: Lona 440g brilhosa"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Categoria</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none"
                  >
                    <option value="Lonas/Mídias">Lonas/Mídias</option>
                    <option value="Adesivos">Adesivos</option>
                    <option value="Fachadas">Fachadas</option>
                    <option value="Crachás/Credenciais">Crachás/Credenciais</option>
                    <option value="Papelaria">Papelaria</option>
                    <option value="Serralheria">Serralheria</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Unidade Medida</label>
                  <select 
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none"
                  >
                    <option value="m²">Metro Quadrado (m²)</option>
                    <option value="un">Unidade (un)</option>
                    <option value="m">Metro linear (m)</option>
                    <option value="milheiro">Milheiro</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Estoque Inicial</label>
                  <input 
                    type="number" 
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Custo Un.</label>
                  <input 
                    type="number" 
                    value={newProduct.cost}
                    onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Preço Venda *</label>
                  <input 
                    type="number" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nível de Alerta (Estoque Mínimo)</label>
                <input 
                  type="number" 
                  value={newProduct.minStock}
                  onChange={(e) => setNewProduct({ ...newProduct, minStock: e.target.value })}
                  className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none"
                  min="1"
                />
              </div>
              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsProductModalOpen(false)} 
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-[#39FF14] text-black font-extrabold px-5 py-2 rounded-xl text-sm hover:bg-[#2ee010]"
                >
                  Cadastrar Insumo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: NOVA ORDEM DE SERVIÇO (O.S.) COM ASSISTENTE DE IA  */}
      {/* ========================================================= */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in">
          <div className="bg-[#17122c] border border-purple-900/50 w-full max-w-2xl p-6 rounded-2xl space-y-4 my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calculator className="text-[#39FF14]" /> Elaborar Ordem de Serviço / Orçamento
              </h3>
              <button onClick={() => setIsOrderModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* SEÇÃO DA INTELIGÊNCIA ARTIFICIAL: GERADOR DE O.S. RAPIDAMENTE */}
            <div className="bg-purple-950/20 p-4 rounded-xl border border-[#39FF14]/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#39FF14] flex items-center gap-1.5">
                  <Sparkles size={16} className="text-[#39FF14] animate-bounce" />
                  Assistente de O.S. Inteligente (Dexix AI)
                </span>
                <span className="bg-[#39FF14]/10 text-[9px] text-[#39FF14] px-1.5 py-0.5 rounded uppercase font-bold">Beta</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Escreva livremente as dimensões e materiais que o cliente deseja. A IA calcula a cubagem (m²) de forma matemática e adiciona os insumos necessários ao orçamento!
              </p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ex: Quero um painel de 2 por 1,5 metros de lona com ilhós e 3 metros de estrutura metalom..."
                  value={aiOsPrompt}
                  onChange={(e) => setAiOsPrompt(e.target.value)}
                  className="flex-1 bg-[#120e24] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleGenerateAiOs}
                  disabled={isAiOsLoading}
                  className="bg-[#7A22FF] hover:bg-[#6819e6] text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                >
                  {isAiOsLoading ? (
                    <Loader2 className="animate-spin text-[#39FF14]" size={14} />
                  ) : (
                    <Wand2 size={14} className="text-[#39FF14]" />
                  )}
                  Construir O.S.
                </button>
              </div>
            </div>
            
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Selecionar Cliente Responsável *</label>
                  <select 
                    value={newOrder.customerId}
                    onChange={(e) => setNewOrder({ ...newOrder, customerId: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#7A22FF]"
                    required
                  >
                    <option value="">-- Selecione o Cliente --</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.contact})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Prazo de Entrega Estimado</label>
                  <input 
                    type="date" 
                    value={newOrder.deliveryDate}
                    onChange={(e) => setNewOrder({ ...newOrder, deliveryDate: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* AUXILIAR MANUAL DE ADIÇÃO DE ITENS */}
              <div className="bg-[#120e24] p-4 rounded-xl border border-purple-900/20 space-y-3">
                <span className="text-xs font-bold text-slate-300 block">Especificações Técnicas de Orçamento</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-slate-400 block mb-1">Serviço ou Material da O.S.</label>
                    <select 
                      value={newOrder.tempProductId}
                      onChange={(e) => setNewOrder({ ...newOrder, tempProductId: e.target.value })}
                      className="w-full bg-[#17122c] border border-purple-900/40 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                    >
                      <option value="">-- Adicionar Manualmente --</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} - R$ {p.price}/ {p.unit}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Quantidade / Cubagem</label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        value={newOrder.tempQty}
                        onChange={(e) => setNewOrder({ ...newOrder, tempQty: e.target.value })}
                        className="w-full bg-[#17122c] border border-purple-900/40 rounded-xl px-3 py-2 text-white text-xs text-center focus:outline-none"
                        min="1"
                      />
                      <button 
                        type="button"
                        onClick={handleAddItemToOrder}
                        className="bg-[#39FF14] hover:bg-[#2ee010] text-black font-extrabold px-3 py-2 rounded-xl text-xs transition"
                      >
                        Inserir
                      </button>
                    </div>
                  </div>
                </div>

                {/* VISUALIZAÇÃO DE ITENS ADICIONADOS */}
                {newOrder.items.length > 0 && (
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-purple-900/20 text-slate-400">
                          <th className="py-2">Material / Produto</th>
                          <th className="py-2 text-center">Quant / m²</th>
                          <th className="py-2 text-right">Unitário</th>
                          <th className="py-2 text-right">Subtotal</th>
                          <th className="py-2 text-center">Remover</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-900/10">
                        {newOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="py-2 font-semibold text-white">{item.productName}</td>
                            <td className="py-2 text-center text-slate-300">{item.qty} {item.unit}</td>
                            <td className="py-2 text-right text-slate-300">R$ {item.price.toFixed(2)}</td>
                            <td className="py-2 text-right font-bold text-[#39FF14]">R$ {item.total.toFixed(2)}</td>
                            <td className="py-2 text-center">
                              <button 
                                type="button" 
                                onClick={() => handleRemoveItemFromOrder(index)}
                                className="text-pink-500 hover:text-pink-400"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-right pt-3 border-t border-purple-900/20 font-bold text-sm text-[#39FF14]">
                      Total OS Estimado: R$ {newOrder.items.reduce((sum, item) => sum + item.total, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Status de Produção Inicial</label>
                <select 
                  value={newOrder.status}
                  onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                  className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none"
                >
                  <option value="Pendente">Aguardando Aprovação (Pendente)</option>
                  <option value="Orçamento">Apenas Orçamento Comercial</option>
                  <option value="Produzindo">Enviar Direto para Produção</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Notas Gerais de Produção / Observações Técnicas</label>
                <textarea 
                  value={newOrder.description}
                  onChange={(e) => setNewOrder({ ...newOrder, description: e.target.value })}
                  className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white focus:outline-none h-20 text-xs"
                  placeholder="Instruções de acabamento, detalhes da fachada, dobras, ilhós, etc..."
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsOrderModalOpen(false)} 
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-[#39FF14] text-black font-extrabold px-6 py-2.5 rounded-xl text-sm hover:bg-[#2ee010]"
                >
                  Confirmar e Gerar OS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: NOVO LANÇAMENTO FINANCEIRO          */}
      {/* ========================================== */}
      {isFinancialModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#17122c] border border-purple-900/50 w-full max-w-md p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <DollarSign className="text-[#39FF14]" /> Novo Lançamento de Caixa
              </h3>
              <button onClick={() => setIsFinancialModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddFinancial} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Tipo de Lançamento</label>
                  <select 
                    value={newFinancial.type}
                    onChange={(e) => setNewFinancial({ ...newFinancial, type: e.target.value, category: e.target.value === 'Receita' ? 'Venda de Serviços' : 'Insumos' })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white"
                  >
                    <option value="Receita">Receita (Entrada)</option>
                    <option value="Despesa">Despesa (Saída)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Categoria de Conta</label>
                  <select 
                    value={newFinancial.category}
                    onChange={(e) => setNewFinancial({ ...newFinancial, category: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white"
                  >
                    {newFinancial.type === 'Receita' ? (
                      <>
                        <option value="Venda de Serviços">Venda de Serviços</option>
                        <option value="Venda de Produtos">Venda de Produtos</option>
                        <option value="Aportes/Outros">Aportes / Outros</option>
                      </>
                    ) : (
                      <>
                        <option value="Insumos">Compra de Insumos/Mídia</option>
                        <option value="Fixa">Despesa de Infraestrutura</option>
                        <option value="Marketing">Anúncios e Marketing</option>
                        <option value="Folha">Pró-labore e Colaboradores</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Descrição / Justificativa *</label>
                <input 
                  type="text" 
                  value={newFinancial.description}
                  onChange={(e) => setNewFinancial({ ...newFinancial, description: e.target.value })}
                  className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white"
                  placeholder="Ex: Compra de Tintas EcoSolvente DX5"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Valor Unitário *</label>
                  <input 
                    type="number" 
                    value={newFinancial.amount}
                    onChange={(e) => setNewFinancial({ ...newFinancial, amount: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white"
                    step="0.01"
                    min="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Data Competência *</label>
                  <input 
                    type="date" 
                    value={newFinancial.date}
                    onChange={(e) => setNewFinancial({ ...newFinancial, date: e.target.value })}
                    className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Status Inicial do Pagamento</label>
                <select 
                  value={newFinancial.status}
                  onChange={(e) => setNewFinancial({ ...newFinancial, status: e.target.value })}
                  className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white"
                >
                  <option value="Pendente">Aguardando Conciliação (Pendente)</option>
                  <option value="Pago">Consolidado e Quitado (Pago)</option>
                </select>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsFinancialModalOpen(false)} 
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-[#39FF14] text-black font-extrabold px-5 py-2 rounded-xl text-sm hover:bg-[#2ee010]"
                >
                  Consolidar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: VISUALIZAÇÃO DE DETALHES DA O.S.    */}
      {/* ========================================== */}
      {isViewOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in">
          <div className="bg-[#17122c] border border-purple-900/50 w-full max-w-2xl p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-purple-900/20 pb-4">
              <DexixLogo />
              <div className="text-right">
                <h4 className="font-bold text-white text-lg">{selectedOrder.id}</h4>
                <span className="text-xs text-slate-400">Emissão: {selectedOrder.date}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">Cliente Faturado:</span>
                <span className="font-bold text-white">{selectedOrder.customerName}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Prazo de Entrega:</span>
                <span className="font-bold text-[#39FF14]">{selectedOrder.deliveryDate}</span>
              </div>
            </div>

            <div className="border-t border-b border-purple-900/20 py-4">
              <span className="text-xs text-slate-400 block mb-2">Resumo da O.S.</span>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-purple-900/10 text-slate-400">
                    <th className="py-2">Item/Insumo Solicitado</th>
                    <th className="py-2 text-center">Quantidade</th>
                    <th className="py-2 text-right">Valor Unitário</th>
                    <th className="py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/10">
                  {selectedOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 font-semibold text-white">{item.productName}</td>
                      <td className="py-2.5 text-center text-slate-300">{item.qty} {item.unit}</td>
                      <td className="py-2.5 text-right text-slate-300">R$ {item.price.toFixed(2)}</td>
                      <td className="py-2.5 text-right font-extrabold text-[#39FF14]">R$ {item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 block">Observações e Informações Técnicas de Produção:</span>
              <p className="text-xs text-slate-300 bg-[#120e24] p-3 rounded-xl border border-purple-900/35 italic">
                "{selectedOrder.description || 'Nenhuma observação técnica fornecida.'}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-purple-900/20">
              <div className="text-left">
                <span className="text-xs text-slate-400">Total da Ordem:</span>
                <h3 className="text-2xl font-black text-[#39FF14]">R$ {selectedOrder.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    window.print();
                  }}
                  className="bg-transparent border border-purple-500 text-purple-300 hover:bg-purple-950/20 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Printer size={14} /> Imprimir Guia
                </button>
                <button 
                  onClick={() => setIsViewOrderModalOpen(false)}
                  className="bg-[#7A22FF] hover:bg-[#6819e6] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition"
                >
                  Fechar Visualização
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: SIMULADOR DE ENVIO DE COMUNICAÇÃO DE O.S. INTEGRADO COM IA */}
      {/* ============================================================== */}
      {isNotificationModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#17122c] border border-purple-900/50 w-full max-w-md p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Send className="text-[#39FF14]" /> Central de Notificações Dexix
              </h3>
              <button onClick={() => setIsNotificationModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="bg-[#120e24] p-4 rounded-xl border border-purple-900/30 space-y-2">
              <div className="text-xs text-slate-400">
                <span className="font-bold text-white">Destinatário:</span> {notificationTarget.name}
              </div>
              <div className="text-xs text-slate-400">
                <span className="font-bold text-white">Telefone:</span> {notificationTarget.phone}
              </div>
              <div className="text-xs text-slate-400">
                <span className="font-bold text-white">Contexto:</span> {notificationTarget.context}
              </div>
            </div>

            {/* BARRA DE COPYWRITING DA IA */}
            <div className="bg-[#7A22FF]/10 p-3 rounded-xl border border-[#7A22FF]/30 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#39FF14] flex items-center gap-1">
                <Sparkles size={12} />
                Aprimorar Tom com Dexix AI
              </span>
              <div className="flex gap-2 items-center">
                <select 
                  value={aiMsgTone}
                  onChange={(e) => setAiMsgTone(e.target.value)}
                  className="bg-[#120e24] border border-purple-900/40 rounded-xl px-2.5 py-1.5 text-[11px] text-white focus:outline-none flex-1"
                >
                  <option value="Persuasivo">Vendedor / Persuasivo</option>
                  <option value="Cobrança Amigável">Cobrança Amigável</option>
                  <option value="Produção Atrasada">Aviso de Ajuste de Prazo</option>
                  <option value="Urgente">Urgente / Aprovação</option>
                </select>
                <button
                  type="button"
                  onClick={handleAprimorarMensagemComIA}
                  disabled={isAiMsgLoading}
                  className="bg-[#39FF14] hover:bg-[#2ee010] text-black font-extrabold text-[10px] px-3 py-2 rounded-lg transition shrink-0 flex items-center gap-1 disabled:opacity-50"
                >
                  {isAiMsgLoading ? (
                    <Loader2 className="animate-spin" size={12} />
                  ) : (
                    <Wand2 size={12} />
                  )}
                  Reescrever
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Mensagem Final:</label>
              <textarea 
                value={customNotificationMessage}
                onChange={(e) => setCustomNotificationMessage(e.target.value)}
                className="w-full bg-[#120e24] border border-purple-900/40 rounded-xl px-4 py-2 text-white text-xs focus:outline-none h-32"
              />
            </div>

            {notificationStatusMsg && (
              <div className="text-center text-xs text-[#39FF14] font-bold">
                {notificationStatusMsg}
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              {/* BOTÃO DE REDIRECIONAMENTO WHATSAPP REAL */}
              <button 
                onClick={handleSendRealWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-black font-black py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
              >
                <Send size={15} /> Abrir Conversa no WhatsApp Real 🚀
              </button>

              <div className="flex items-center justify-end gap-2 mt-2">
                <button 
                  onClick={() => setIsNotificationModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs"
                >
                  Desistir
                </button>
                <button 
                  onClick={handleSendMockWhatsApp}
                  className="bg-purple-900/40 hover:bg-purple-900/70 text-purple-200 font-bold px-4 py-2 rounded-xl text-xs transition"
                >
                  Simular Internamente 📱
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}