import { Monitor, Smartphone, TabletSmartphone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface MobileDeviceMessageProps {
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

const MobileDeviceMessage: React.FC<MobileDeviceMessageProps> = ({ deviceType }) => {
  const getIcon = () => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className='mb-4 h-12 w-12 text-gray-600' />;
      case 'tablet':
        return <TabletSmartphone className='mb-4 h-12 w-12 text-gray-600' />;
      default:
        return <Monitor className='mb-4 h-12 w-12 text-gray-600' />;
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4'>
      <Card className='w-full max-w-md border-t-4 border-t-blue-500 shadow-lg'>
        <CardHeader>
          <div className='flex flex-col items-center'>
            {getIcon()}
            <h2 className='text-2xl font-bold text-gray-800'>Best on Larger Screens</h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-center leading-relaxed text-gray-600'>
            {deviceType === 'mobile'
              ? "Please switch to a desktop or laptop for the full experience. We're working on mobile support!"
              : 'Please switch to a desktop device to access all features.'}
          </p>
          <p className='mt-4 text-center text-sm text-gray-500'>Recommended: Screen width 1024px or larger</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDeviceMessage;
