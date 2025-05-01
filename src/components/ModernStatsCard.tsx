
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, FileText, Users } from 'lucide-react';

const ModernStatsCard: React.FC = () => {
  return (
    <div className="w-full">
      <Card className="bg-white/90 backdrop-blur-lg border border-gray-100 shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
            {/* Coluna 1 */}
            <div className="p-6 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full"></div>
              <div className="relative z-10">
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-4xl font-bold text-primary">70%</h3>
                <p className="text-sm text-gray-600 mt-1">Redução em multas e juros</p>
                <p className="text-xs text-gray-500 mt-4">Economia real através de transação tributária</p>
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="p-6 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#f59e0b]/5 rounded-full"></div>
              <div className="relative z-10">
                <FileText className="h-12 w-12 text-[#f59e0b] mb-4" />
                <h3 className="text-4xl font-bold text-[#f59e0b]">98%</h3>
                <p className="text-sm text-gray-600 mt-1">Taxa de sucesso</p>
                <p className="text-xs text-gray-500 mt-4">Alta performance na regularização de dívidas</p>
              </div>
            </div>

            {/* Coluna 3 */}
            <div className="p-6 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/5 rounded-full"></div>
              <div className="relative z-10">
                <Users className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-4xl font-bold text-secondary">+500</h3>
                <p className="text-sm text-gray-600 mt-1">Clientes atendidos</p>
                <p className="text-xs text-gray-500 mt-4">Empresas e pessoas físicas em todo Brasil</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernStatsCard;
