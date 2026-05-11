'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { submitContact } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number is invalid'),
  subject: z.string().min(5, 'Subject is too short'),
  message: z.string().min(20, 'Message is too short'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { language } = useI18n();
  const [loading, setLoading] = useState(false);

  const translations = {
    uz: {
      title: 'Биз билан контакт',
      subtitle: 'Иззалари ва ишончлилик',
      form_title: 'Хабар юбориш',
      name: 'Ишм',
      email: 'Электрон почтаси',
      phone: 'Телефон рақами',
      subject: 'Мавзу',
      message: 'Хабар',
      send: 'Юбориш',
      sending: 'Юборилмоқда...',
      info: 'Контакт маълумоти',
      address: 'Хива, Хорезм вилояти, Ўзбекистон',
      phone_num: '+998 61 226 56 56',
      email_addr: 'info@khorezm.uz',
      hours: 'Ишчи вақти',
      hours_desc: 'Дўмбасанбидан жўма кунигача: 09:00 - 18:00',
      success: 'Спасибо! Ваше сообщение отправлено.',
      error: 'Ошибка при отправке сообщения.',
    },
    en: {
      title: 'Get In Touch',
      subtitle: 'We&apos;d love to hear from you',
      form_title: 'Send us a Message',
      name: 'Name',
      email: 'Email',
      phone: 'Phone Number',
      subject: 'Subject',
      message: 'Message',
      send: 'Send',
      sending: 'Sending...',
      info: 'Contact Information',
      address: 'Khiva, Khorezm Region, Uzbekistan',
      phone_num: '+998 61 226 56 56',
      email_addr: 'info@khorezm.uz',
      hours: 'Working Hours',
      hours_desc: 'Monday to Friday: 09:00 - 18:00',
      success: 'Thank you! Your message has been sent.',
      error: 'Error sending message.',
    },
    ru: {
      title: 'Свяжитесь с нами',
      subtitle: 'Мы рады вам помочь',
      form_title: 'Отправить сообщение',
      name: 'Имя',
      email: 'Электронная почта',
      phone: 'Номер телефона',
      subject: 'Тема',
      message: 'Сообщение',
      send: 'Отправить',
      sending: 'Отправка...',
      info: 'Контактная информация',
      address: 'Хива, регион Хорезм, Узбекистан',
      phone_num: '+998 61 226 56 56',
      email_addr: 'info@khorezm.uz',
      hours: 'Часы работы',
      hours_desc: 'Понедельник-пятница: 09:00 - 18:00',
      success: 'Спасибо! Ваше сообщение отправлено.',
      error: 'Ошибка при отправке сообщения.',
    },
  };

  const trans = translations[language];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    const success = await submitContact(data);
    setLoading(false);

    if (success) {
      toast.success(trans.success);
      reset();
    } else {
      toast.error(trans.error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-16 bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {trans.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {trans.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Info Cards */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={24} className="text-primary" />
                  <CardTitle className="text-lg">Email</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {trans.email_addr}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Phone size={24} className="text-primary" />
                  <CardTitle className="text-lg">Phone</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {trans.phone_num}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin size={24} className="text-primary" />
                  <CardTitle className="text-lg">Address</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {trans.address}
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">{trans.form_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {trans.name}
                    </label>
                    <Input
                      {...register('name')}
                      placeholder={trans.name}
                      className="mt-1 bg-secondary border-border"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {trans.email}
                    </label>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder={trans.email}
                      className="mt-1 bg-secondary border-border"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {trans.phone}
                    </label>
                    <Input
                      {...register('phone')}
                      placeholder={trans.phone}
                      className="mt-1 bg-secondary border-border"
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {trans.subject}
                    </label>
                    <Input
                      {...register('subject')}
                      placeholder={trans.subject}
                      className="mt-1 bg-secondary border-border"
                    />
                    {errors.subject && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {trans.message}
                    </label>
                    <Textarea
                      {...register('message')}
                      placeholder={trans.message}
                      rows={5}
                      className="mt-1 bg-secondary border-border"
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {loading ? trans.sending : trans.send}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="space-y-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl">{trans.info}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {trans.hours}
                    </h4>
                    <p className="text-muted-foreground">{trans.hours_desc}</p>
                  </div>

                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">
                      {language === 'uz'
                        ? 'Шахси битимлар учун муайян вақт олишни сўраш.'
                        : language === 'ru'
                          ? 'Пожалуйста, обратитесь по указанным контактам для личных встреч.'
                          : 'Please contact us for personal meetings during business hours.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
