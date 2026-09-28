import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

const features = [
  {
    title: 'تصميم متجاوب',
    text: 'واجهة مناسبة للجوال وسطح المكتب مع توزيع أنيق ومريح.',
  },
  {
    title: 'سرعة الأداء',
    text: 'بنية خفيفة وتعليمات واضحة تضمن تجربة استخدام سلسة.',
  },
  {
    title: 'تجربة واضحة',
    text: 'رسائل وإجراءات مباشرة تجعل المستخدم يفهم كل نقطة بسهولة.',
  },
]

const stats = [
  { value: '24K+', label: 'مستخدم' },
  { value: '4.9', label: 'تقييم' },
  { value: '98%', label: 'رضا' },
]

function App() {
  const [dbStatus, setDbStatus] = useState('جاري الاتصال...')
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const checkConnection = async () => {
      const { error } = await supabase.from('profiles').select('id').limit(1)

      if (error) {
        setDbStatus('يرجى إنشاء جدول profiles في Supabase')
        return
      }

      setDbStatus('تم الاتصال بقاعدة البيانات بنجاح')
    }

    checkConnection()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage('يرجى تعبئة الاسم والبريد الإلكتروني')
      return
    }

    setMessage('جاري إرسال البيانات إلى Supabase...')

    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
        },
      ])
      .select()

    if (error) {
      setMessage(`فشل التسجيل: ${error.message}`)
      return
    }

    setMessage(`تم التسجيل بنجاح: ${data?.[0]?.name ?? formData.name}`)
    setFormData({ name: '', email: '' })
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <span>Ali Studio</span>
        </div>

        <nav className="nav">
          <a href="#home">الرئيسية</a>
          <a href="#features">المزايا</a>
          <a href="#pricing">الأسعار</a>
        </nav>

        <button type="button" className="nav-button">
          احجز الآن
        </button>
      </header>

      <main className="hero-section" id="home">
        <div className="hero-copy">
          <span className="badge">واجهة حديثة</span>
          <h1>أنشئ تجربة رقمية رائعة للمستخدمين.</h1>
          <p>
            صفحة بسيطة لكنها احترافية، مصممة لتبرز محتواك بوضوح وترك انطباع أول
            ممتاز.
          </p>

          <div className="actions">
            <button type="button" className="primary-btn">
              ابدأ الآن
            </button>
            <button type="button" className="secondary-btn">
              شاهد العرض
            </button>
          </div>

          <div className="stats-row">
            {stats.map((item) => (
              <div key={item.label} className="stat-item">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="db-status">{dbStatus}</div>
        </div>

        <div className="hero-panel" aria-label="لوحة تحكم">
          <div className="panel-card main-card">
            <div className="card-header">
              <span className="dot green" />
              <span className="dot yellow" />
              <span className="dot red" />
            </div>

            <div className="chart-box">
              <div className="chart-bars" aria-hidden="true">
                <span style={{ height: '35%' }} />
                <span style={{ height: '55%' }} />
                <span style={{ height: '70%' }} />
                <span style={{ height: '60%' }} />
                <span style={{ height: '90%' }} />
                <span style={{ height: '100%' }} />
              </div>
            </div>
          </div>

          <div className="panel-card info-card">
            <p>إيرادات هذا الشهر</p>
            <h3>$12,480</h3>
            <span className="growth">+18.2% مقارنة بالأمس</span>
          </div>
        </div>
      </main>

      <section className="features" id="features">
        {features.map((feature) => (
          <article key={feature.title} className="feature-card">
            <div className="feature-icon">✦</div>
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>

      <section className="register-section">
        <div className="register-card">
          <h2>تسجيل مستخدم جديد</h2>
          <p>استخدم هذه الخانة لاختبار إضافة البيانات إلى قاعدة Supabase.</p>

          <form onSubmit={handleSubmit} className="register-form">
            <label>
              الاسم
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل الاسم"
              />
            </label>

            <label>
              البريد الإلكتروني
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />
            </label>

            <button type="submit" className="submit-btn">
              تسجيل
            </button>
          </form>

          {message && <div className="form-message">{message}</div>}
        </div>
      </section>
    </div>
  )
}

export default App
