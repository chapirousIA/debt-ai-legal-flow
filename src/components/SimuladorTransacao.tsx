
import React, { useState } from 'react';
import { Mail, Phone, Calculator } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import WhatsAppButton from './WhatsAppButton';

const SimuladorTransacao: React.FC = () => {
  // Estados para os campos do formulário
  const [valorDivida, setValorDivida] = useState('');
  const [tipoDivida, setTipoDivida] = useState('nao-previdenciaria');
  const [tipoContribuinte, setTipoContribuinte] = useState('pessoa-juridica');
  const [categoriaContribuinte, setCategoriaContribuinte] = useState('normal');
  const [capag, setCapag] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataInscricao, setDataInscricao] = useState('');
  
  // Estado para armazenar os resultados da simulação
  const [resultado, setResultado] = useState<any>(null);
  const [simulacoesParcelas, setSimulacoesParcelas] = useState<any>(null);
  const [simulacoesCapag, setSimulacoesCapag] = useState<any>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // Função para formatar valores monetários
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // Função para formatar números com separadores de milhar
  const formatarNumero = (valor: number) => {
    return new Intl.NumberFormat('pt-BR').format(valor);
  };

  // Função para validar o formulário
  const validarFormulario = () => {
    const valorNumerico = valorDivida.replace(/\./g, '').replace(',', '.');
    
    if (!valorDivida || isNaN(parseFloat(valorNumerico)) || parseFloat(valorNumerico) <= 0) {
      alert('Por favor, informe um valor válido para a dívida.');
      return false;
    }
    if (!parcelas || isNaN(parseInt(parcelas)) || parseInt(parcelas) <= 0) {
      alert('Por favor, informe um número válido de parcelas.');
      return false;
    }
    if (!nome.trim()) {
      alert('Por favor, informe seu nome.');
      return false;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      alert('Por favor, informe um e-mail válido.');
      return false;
    }
    if (!telefone.trim() || telefone.length < 10) {
      alert('Por favor, informe um telefone válido.');
      return false;
    }
    if (!dataInscricao.trim()) {
      alert('Por favor, informe a data de inscrição da dívida.');
      return false;
    }
    return true;
  };

  // Função para calcular os limites de acordo com o tipo de contribuinte
  const calcularLimites = () => {
    // Valores base dos limites
    let limiteDesconto = 0.65; // 65% para contribuintes normais
    let limiteParcelas = 120; // 120 meses para contribuintes normais
    
    // Ajustes de acordo com o tipo de contribuinte
    if (['pessoa-natural', 'microempresa', 'pequeno-porte', 'cooperativa', 'agricultor-familiar'].includes(categoriaContribuinte)) {
      limiteDesconto = 0.70; // 70% para pessoa natural, ME, EPP, cooperativas e agricultores familiares
      limiteParcelas = 145; // 145 meses para pessoa natural, ME, EPP, cooperativas e agricultores familiares
    }
    
    // Restrição para dívidas previdenciárias
    if (tipoDivida === 'previdenciaria') {
      limiteParcelas = 60; // Máximo de 60 meses para dívidas previdenciárias
    }
    
    return { limiteDesconto, limiteParcelas };
  };
  
  // Função para calcular os descontos com base na CAPAG
  const calcularDescontosCapag = (limiteDesconto: number) => {
    const descontos = {
      A: { min: 0, max: 0 },
      B: { min: 0, max: 0 },
      C: { min: 0.30, max: 0.40 },
      D: { min: 0.50, max: limiteDesconto }
    };
    
    return descontos;
  };

  // Função para calcular a simulação
  const calcularSimulacao = () => {
    if (!validarFormulario()) return;

    // Obtenção dos limites aplicáveis
    const { limiteDesconto, limiteParcelas } = calcularLimites();
    
    // Correção de parcelas se exceder o limite
    let parcelasAplicadas = Math.min(parseInt(parcelas), limiteParcelas);
    
    // Valor da dívida
    const valorOriginal = parseFloat(valorDivida.replace(/\./g, '').replace(',', '.'));
    
    // Cálculo da redução com base no número de parcelas
    let percentualReducao;
    
    // Para pequeno valor (até 60 salários mínimos)
    const valorSalarioMinimo = 1412; // Valor do salário mínimo em 2025
    const limiteContenciosoPequeno = 60 * valorSalarioMinimo;
    
    if (valorOriginal <= limiteContenciosoPequeno) {
      if (parcelasAplicadas <= 7) {
        percentualReducao = 0.50; // 50% para até 7 parcelas
      } else if (parcelasAplicadas <= 12) {
        percentualReducao = 0.45; // 45% para até 12 parcelas
      } else if (parcelasAplicadas <= 30) {
        percentualReducao = 0.40; // 40% para até 30 parcelas
      } else {
        percentualReducao = 0.30; // 30% para mais parcelas
      }
    } else {
      // Para valores maiores, calculamos com base no limite de desconto e CAPAG
      if (capag === 'A' || capag === 'B') {
        percentualReducao = 0;
      } else if (capag === 'C') {
        percentualReducao = 0.35;
      } else if (capag === 'D') {
        percentualReducao = limiteDesconto;
      } else {
        // CAPAG desconhecido, usamos estimativa baseada nas parcelas
        if (parcelasAplicadas <= 12) {
          percentualReducao = limiteDesconto;
        } else if (parcelasAplicadas <= 60) {
          percentualReducao = limiteDesconto * 0.9;
        } else if (parcelasAplicadas <= 90) {
          percentualReducao = limiteDesconto * 0.8;
        } else {
          percentualReducao = limiteDesconto * 0.7;
        }
      }
    }
    
    // Cálculo do valor com desconto
    const valorDesconto = valorOriginal * percentualReducao;
    const valorComDesconto = valorOriginal - valorDesconto;
    
    // Cálculo do valor da entrada (5% ou 6% dependendo do tipo)
    const percentualEntrada = valorOriginal <= limiteContenciosoPequeno ? 0.05 : 0.06;
    const valorEntrada = valorComDesconto * percentualEntrada;
    const numeroPrestacaoEntrada = valorOriginal <= limiteContenciosoPequeno ? 5 : 6;
    const valorPrestacaoEntrada = valorEntrada / numeroPrestacaoEntrada;
    
    // Cálculo do valor de cada parcela (valor com desconto - entrada) / número de parcelas
    const valorParcela = (valorComDesconto - valorEntrada) / parcelasAplicadas;
    
    // Gerar múltiplas simulações de parcelas
    const gerarSimulacoesParcelas = () => {
      const opcoes = [];
      
      // Simulação de até 24 meses
      const parcelas24 = Math.min(24, limiteParcelas);
      const valorParcela24 = (valorComDesconto - valorEntrada) / parcelas24;
      
      // Simulação de 60 meses
      const parcelas60 = Math.min(60, limiteParcelas);
      const valorParcela60 = (valorComDesconto - valorEntrada) / parcelas60;
      
      // Simulação máxima de parcelas
      const valorParcelaMax = (valorComDesconto - valorEntrada) / limiteParcelas;
      
      opcoes.push({
        prazo: parcelas24,
        valorParcela: valorParcela24,
        valorTotal: valorEntrada + (valorParcela24 * parcelas24)
      });
      
      if (limiteParcelas >= 60) {
        opcoes.push({
          prazo: parcelas60,
          valorParcela: valorParcela60,
          valorTotal: valorEntrada + (valorParcela60 * parcelas60)
        });
      }
      
      if (limiteParcelas > 60) {
        opcoes.push({
          prazo: limiteParcelas,
          valorParcela: valorParcelaMax,
          valorTotal: valorEntrada + (valorParcelaMax * limiteParcelas)
        });
      }
      
      return opcoes;
    };
    
    // Gerar simulações por CAPAG
    const gerarSimulacoesCapag = () => {
      const descontosCapag = calcularDescontosCapag(limiteDesconto);
      const result: Record<string, any> = {};
      
      for (const [categoria, faixas] of Object.entries(descontosCapag)) {
        const descontoMin = valorOriginal * (faixas as any).min;
        const descontoMax = valorOriginal * (faixas as any).max;
        
        const valorComDescontoMin = valorOriginal - descontoMin;
        const valorComDescontoMax = valorOriginal - descontoMax;
        
        result[categoria] = {
          percentualMin: (faixas as any).min * 100,
          percentualMax: (faixas as any).max * 100,
          descontoMin,
          descontoMax,
          valorComDescontoMin,
          valorComDescontoMax
        };
      }
      
      return result;
    };
    
    // Preparação dos resultados
    const novoResultado = {
      valorOriginal,
      percentualReducao,
      valorDesconto,
      valorComDesconto,
      percentualEntrada,
      valorEntrada,
      numeroPrestacaoEntrada,
      valorPrestacaoEntrada,
      parcelasAplicadas,
      valorParcela,
      limiteDesconto,
      limiteParcelas
    };
    
    // Atualização do estado com os resultados
    setResultado(novoResultado);
    setSimulacoesParcelas(gerarSimulacoesParcelas());
    setSimulacoesCapag(gerarSimulacoesCapag());
    setMostrarResultado(true);
  };

  // Função para simular o envio por e-mail
  const enviarEmail = () => {
    // Aqui seria implementada a lógica real de envio de e-mail
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  // Função para imprimir a simulação
  const imprimirSimulacao = () => {
    window.print();
  };

  // Manipulador para o input de valor da dívida
  const handleValorDividaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove caracteres não numéricos
    let valor = e.target.value.replace(/\D/g, '');
    
    // Formata o valor para exibição
    if (valor) {
      valor = (parseFloat(valor) / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    
    setValorDivida(valor);
  };

  // Manipulador para o input de telefone
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value.replace(/\D/g, '');
    
    if (valor.length > 0) {
      // Formata como (XX) XXXXX-XXXX
      if (valor.length <= 2) {
        valor = `(${valor}`;
      } else if (valor.length <= 7) {
        valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
      } else if (valor.length <= 11) {
        valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
      } else {
        valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7, 11)}`;
      }
    }
    
    setTelefone(valor);
  };

  return (
    <section id="simulador" className="py-16 md:py-24 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title reveal">Simulador de Transação Tributária</h2>
          <p className="section-subtitle max-w-3xl mx-auto reveal" data-direction="bottom">
            Simule os descontos possíveis para regularização de sua dívida ativa com a União
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {!mostrarResultado ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-md">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-primary">Dados da Dívida</h3>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="valor-divida">Valor da Dívida:</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-2.5 text-gray-500">R$</span>
                      <Input
                        id="valor-divida"
                        type="text"
                        value={valorDivida}
                        onChange={handleValorDividaChange}
                        className="pl-8"
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="tipo-divida">Tipo da Dívida:</Label>
                    <select
                      id="tipo-divida"
                      value={tipoDivida}
                      onChange={(e) => setTipoDivida(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="nao-previdenciaria">Não Previdenciária</option>
                      <option value="previdenciaria">Previdenciária</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="tipo-contribuinte">Tipo de Contribuinte:</Label>
                    <select
                      id="tipo-contribuinte"
                      value={tipoContribuinte}
                      onChange={(e) => setTipoContribuinte(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="pessoa-juridica">Pessoa Jurídica</option>
                      <option value="pessoa-fisica">Pessoa Física</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="categoria-contribuinte">Categoria do Contribuinte:</Label>
                    <select
                      id="categoria-contribuinte"
                      value={categoriaContribuinte}
                      onChange={(e) => setCategoriaContribuinte(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="normal">Empresa Normal</option>
                      <option value="microempresa">Microempresa</option>
                      <option value="pequeno-porte">Empresa de Pequeno Porte</option>
                      <option value="pessoa-natural">Pessoa Natural</option>
                      <option value="cooperativa">Cooperativa</option>
                      <option value="agricultor-familiar">Agricultor Familiar</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="data-inscricao">Data de Inscrição da Dívida:</Label>
                    <Input
                      id="data-inscricao"
                      type="date"
                      value={dataInscricao}
                      onChange={(e) => setDataInscricao(e.target.value)}
                      max="2025-05-01"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="parcelas">Número de Parcelas Desejadas:</Label>
                    <Input
                      id="parcelas"
                      type="number"
                      value={parcelas}
                      onChange={(e) => setParcelas(e.target.value)}
                      min="1"
                      max="145"
                      className="mt-1"
                      placeholder="Digite o número de parcelas"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-primary">Seus Dados</h3>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo:</Label>
                    <Input
                      id="nome"
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="mt-1"
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mail:</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                      placeholder="Digite seu e-mail"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="telefone">Telefone:</Label>
                    <Input
                      id="telefone"
                      type="text"
                      value={telefone}
                      onChange={handleTelefoneChange}
                      className="mt-1"
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="capag">CAPAG (opcional):</Label>
                    <select
                      id="capag"
                      value={capag}
                      onChange={(e) => setCapag(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Desconhecido</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Classificação de Capacidade de Pagamento do Tesouro Nacional
                    </p>
                  </div>
                  
                  <Button 
                    onClick={calcularSimulacao}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg mt-4"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Simular Transação
                  </Button>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Nota:</strong> Esta é apenas uma simulação estimativa. Os valores reais podem variar 
                      de acordo com a análise da Procuradoria-Geral da Fazenda Nacional, capacidade de pagamento 
                      e outros fatores específicos do seu caso.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-primary">Resultado da Simulação</h3>
                  <div className="print:hidden flex gap-2">
                    <Button
                      variant="outline"
                      onClick={imprimirSimulacao}
                      className="text-gray-600"
                    >
                      Imprimir
                    </Button>
                    <Button
                      onClick={enviarEmail}
                      variant="outline"
                      className="flex items-center text-green-600"
                    >
                      <Mail className="mr-1 h-4 w-4" />
                      {enviado ? "E-mail Enviado!" : "Enviar por E-mail"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm p-4 border">
                      <h4 className="text-lg font-semibold text-primary mb-2">Dados da Dívida</h4>
                      <p className="mb-2"><strong>Valor Original:</strong> {formatarMoeda(resultado.valorOriginal)}</p>
                      <p className="mb-2"><strong>Redução Aplicada:</strong> {(resultado.percentualReducao * 100).toFixed(0)}%</p>
                      <p className="mb-2"><strong>Valor do Desconto:</strong> {formatarMoeda(resultado.valorDesconto)}</p>
                      <p className="font-semibold text-green-700"><strong>Valor com Desconto:</strong> {formatarMoeda(resultado.valorComDesconto)}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-4 border">
                      <h4 className="text-lg font-semibold text-primary mb-2">Limite da Transação</h4>
                      <p className="mb-2"><strong>Desconto Máximo Permitido:</strong> {(resultado.limiteDesconto * 100).toFixed(0)}%</p>
                      <p className="mb-2"><strong>Número Máximo de Parcelas:</strong> {formatarNumero(resultado.limiteParcelas)}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-4 border">
                      <h4 className="text-lg font-semibold text-primary mb-2">Descontos por CAPAG</h4>
                      <p className="text-sm text-gray-600 mb-2">Estimativa com base na Capacidade de Pagamento</p>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>CAPAG</TableHead>
                              <TableHead>Multas</TableHead>
                              <TableHead>Juros</TableHead>
                              <TableHead>Desconto Total</TableHead>
                              <TableHead>Valor Nominal</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>A</TableCell>
                              <TableCell className="text-red-600">0%</TableCell>
                              <TableCell className="text-red-600">0%</TableCell>
                              <TableCell className="text-red-600">0%</TableCell>
                              <TableCell className="text-red-600">R$ 0,00</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>B</TableCell>
                              <TableCell className="text-red-600">0%</TableCell>
                              <TableCell className="text-red-600">0%</TableCell>
                              <TableCell className="text-red-600">0%</TableCell>
                              <TableCell className="text-red-600">R$ 0,00</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>C</TableCell>
                              <TableCell className="text-green-600">100%</TableCell>
                              <TableCell className="text-green-600">50%</TableCell>
                              <TableCell className="text-green-600">35%</TableCell>
                              <TableCell className="text-green-600">{formatarMoeda(resultado.valorOriginal * 0.35)}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>D</TableCell>
                              <TableCell className="text-green-600">100%</TableCell>
                              <TableCell className="text-green-600">100%</TableCell>
                              <TableCell className="text-green-600">{(resultado.limiteDesconto * 100).toFixed(0)}%</TableCell>
                              <TableCell className="text-green-600">{formatarMoeda(resultado.valorDesconto)}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        * Empresas com CAPAG A e B normalmente não têm direito a descontos. Apenas empresas classificadas como C ou D são elegíveis.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm p-4 border">
                      <h4 className="text-lg font-semibold text-primary mb-2">Plano de Pagamento</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium">Entrada:</p>
                          <p className="ml-4">{resultado.numeroPrestacaoEntrada} parcelas de {formatarMoeda(resultado.valorPrestacaoEntrada)} (total: {formatarMoeda(resultado.valorEntrada)})</p>
                          <p className="ml-4 text-sm text-gray-600">Equivalente a {(resultado.percentualEntrada * 100).toFixed(0)}% do valor com desconto</p>
                        </div>
                        <div>
                          <p className="font-medium">Saldo a parcelar:</p>
                          <p className="ml-4">{formatarNumero(resultado.parcelasAplicadas)} parcelas de {formatarMoeda(resultado.valorParcela)}</p>
                          <p className="ml-4 text-sm text-gray-600">Total: {formatarMoeda(resultado.valorParcela * resultado.parcelasAplicadas)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-4 border">
                      <h4 className="text-lg font-semibold text-primary mb-2">Simulações de Pagamento</h4>
                      <p className="text-sm text-gray-600 mb-2">Compare diferentes cenários</p>
                      <div className="overflow-x-auto mt-3">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Cenário</TableHead>
                              <TableHead>Desconto</TableHead>
                              <TableHead>Valor a Pagar</TableHead>
                              <TableHead>Prazo</TableHead>
                              <TableHead>Parcela</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Sem desconto</TableCell>
                              <TableCell>0%</TableCell>
                              <TableCell>{formatarMoeda(resultado.valorOriginal)}</TableCell>
                              <TableCell>60 meses</TableCell>
                              <TableCell>{formatarMoeda(resultado.valorOriginal / 60)}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Desconto mínimo</TableCell>
                              <TableCell>35%</TableCell>
                              <TableCell>{formatarMoeda(resultado.valorOriginal * 0.65)}</TableCell>
                              <TableCell>60 meses</TableCell>
                              <TableCell>{formatarMoeda(resultado.valorOriginal * 0.65 / 60)}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Desconto máximo</TableCell>
                              <TableCell>{(resultado.percentualReducao * 100).toFixed(0)}%</TableCell>
                              <TableCell>{formatarMoeda(resultado.valorComDesconto)}</TableCell>
                              <TableCell>{formatarNumero(resultado.limiteParcelas)} meses</TableCell>
                              <TableCell>{formatarMoeda(resultado.valorParcela)}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-4 border">
                      <h4 className="text-lg font-semibold text-primary mb-2">Economia Máxima Potencial</h4>
                      <p className="font-bold text-green-700 text-xl">
                        {formatarMoeda(resultado.valorDesconto)} ({(resultado.percentualReducao * 100).toFixed(0)}% de desconto)
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Esta é a economia máxima possível se a empresa se enquadrar nas melhores condições previstas na Lei 13.988/2020 
                        e nos editais da PGFN. A economia real dependerá da análise da capacidade de pagamento e outros requisitos legais.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border">
                  <h4 className="text-lg font-semibold text-primary mb-2">Próximos Passos</h4>
                  <p className="mb-4">
                    Para obter uma análise personalizada e iniciar o processo de transação tributária com 
                    acompanhamento especializado, entre em contato com nosso escritório:
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <WhatsAppButton 
                      text="Falar com um Especialista via WhatsApp" 
                      className="flex-1 bg-secondary hover:bg-secondary/90 text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium"
                      message={`Olá! Simulei uma transação tributária para minha dívida de ${formatarMoeda(resultado.valorOriginal)} e gostaria de mais informações.`}
                    />
                    
                    <a
                      href={`mailto:contato@pedrosapeixoto.adv.br?subject=Simulação%20de%20Transação%20Tributária&body=Olá,%0A%0ARealizei%20uma%20simulação%20de%20transação%20tributária%20para%20minha%20dívida%20de%20${encodeURIComponent(formatarMoeda(resultado.valorOriginal))}%20e%20gostaria%20de%20receber%20uma%20análise%20personalizada.%0A%0ANome:%20${encodeURIComponent(nome)}%0ATelefone:%20${encodeURIComponent(telefone)}%0A%0AAtenciosamente,%0A${encodeURIComponent(nome)}`}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Receber Análise por E-mail
                    </a>
                  </div>
                  
                  <p className="mt-4 text-sm text-gray-600">
                    Nossos especialistas irão analisar detalhadamente seu caso e propor a melhor estratégia 
                    para regularização da sua dívida com a União, aproveitando todos os benefícios disponíveis.
                  </p>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Aviso Legal:</strong> Esta simulação é meramente informativa e não constitui promessa 
                    ou garantia de aprovação de transação nos valores e condições apresentados. A transação tributária 
                    depende da análise pela PGFN da capacidade de pagamento, regularidade fiscal e outros requisitos 
                    previstos na Lei 13.988/2020 e nos editais de transação vigentes.
                  </p>
                </div>
                
                <div className="print:hidden mt-4 text-right">
                  <Button
                    variant="link"
                    onClick={() => setMostrarResultado(false)}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Voltar para o formulário
                  </Button>
                </div>
              </CardContent>
              
              <CardFooter className="text-center text-gray-500 text-sm border-t pt-4">
                <p>© 2025 Simulador de Transação Tributária | Com base nos Editais PGDAU da PGFN</p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimuladorTransacao;
