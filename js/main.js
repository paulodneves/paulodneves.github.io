document.addEventListener('DOMContentLoaded', () => {

    // =====================
    // MOBILE MENU
    // =====================
    const mobileBtn  = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconMenu   = document.getElementById('icon-menu');
    const iconClose  = document.getElementById('icon-close');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            const open = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden', open);
            if (iconMenu) iconMenu.classList.toggle('hidden', !open);
            if (iconClose) iconClose.classList.toggle('hidden', open);
        });
    }

    document.querySelectorAll('.nav-mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.add('hidden');
            if (iconMenu) iconMenu.classList.remove('hidden');
            if (iconClose) iconClose.classList.add('hidden');
        });
    });

    // =====================
    // SMOOTH SCROLL
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const id = link.getAttribute('href');
            if (id === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // =====================
    // ACTIVE NAV LINK
    // =====================
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navH     = 68; // matches --nav-h in CSS

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: `-${navH}px 0px -55% 0px` });

    sections.forEach(s => sectionObserver.observe(s));

    // =====================
    // SCROLL REVEAL
    // =====================
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObserver.unobserve(e.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    requestAnimationFrame(() => requestAnimationFrame(() => {
        document.documentElement.classList.add('js-ready');
    }));

    // =====================
    // COUNTER ANIMATION
    // =====================
    function animateCounter(el) {
        const target   = parseInt(el.dataset.target, 10);
        const duration = 1600;
        const steps    = 50;
        const stepMs   = duration / steps;
        let current    = 0;
        const inc      = target / steps;

        const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, stepMs);
    }

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                counterObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    // =====================
    // PORTFOLIO DATA (CASES DE PRODUÇÃO & ROI)
    // =====================
    const portfolioData = [
        {
            title: 'DockSafe — Blindagem de Faturamento & Dupla Checagem SAP',
            sector: 'AUDITORIA DE ALTO VOLUME · OPERAÇÃO JSL / NATURA',
            category: 'software',
            result: 'R$ 16,8M economizados · -80% erros',
            description: 'Plataforma full-stack de verificação de expedição com ingestão em lote offline-first (Parquet) para blindar a API REST e mitigar concorrência crítica no PostgreSQL.',
            pain: 'Risco severo de cobranças de frete duplicadas, erros manuais de expedição e gargalos de concorrência (locks) no PostgreSQL sob pico de operação.',
            solution: 'Arquitetura full-stack em Python, Django, Streamlit, PyQt6 e PostgreSQL com camada batch offline-first em Parquet, evitando R$ 16,8M (~$3M+ USD) em 12 meses.',
            tags: ['Python', 'Django', 'PostgreSQL', 'Parquet', 'Pandas', 'PyQt6', 'SAP'],
            link: 'projetos/DockSafe.html'
        },
        {
            title: 'SAPServices — Decomposição de Monolito para Microsserviço Assíncrono',
            sector: 'ARQUITETURA DE MICROSSERVIÇOS · FASTAPI & DATABRICKS',
            category: 'software',
            result: 'Zero OOM · Escala Multi-CD',
            description: 'Extração do domínio de consulta SAP de um monolito síncrono para um microsserviço assíncrono em FastAPI + PostgreSQL com cache local e resolução no Databricks.',
            pain: 'Incidente de OOM Killer em produção expôs dívida técnica de um sistema fullstack síncrono acoplado que compartilhava banco de dados sob alta carga.',
            solution: 'Diagnóstico post-mortem de causa-raiz e refatoração para microsserviço assíncrono FastAPI com banco próprio alimentado por ETL/RPA e integração on-demand ao Databricks.',
            tags: ['FastAPI', 'Python Async', 'PostgreSQL', 'Databricks', 'ETL / RPA', 'Microsserviços'],
            link: null
        },
        {
            title: 'EcoaLog / SmartSave — Plataforma Real-Time Multi-Sistema',
            sector: 'PRODUTIVIDADE INDUSTRIAL · 1º LUGAR PRÊMIO VERA 2025 NATURA',
            category: 'dados',
            result: 'Ciclo de 7 min · -30 min/h manuais',
            description: 'Plataforma web em Django 6.0 + Django-Ninja (Pydantic) + HTMX consolidando dados de WAMAS WMS, MFC e SAP a cada 7 minutos.',
            pain: 'Dois líderes de linha perdiam 15 minutos a cada hora coletando dados manualmente no chão de fábrica, atrasando o ciclo de report do analista.',
            solution: 'API RESTful com contratos estritos em Pydantic (Django-Ninja) e front-end reativo em HTMX sobre PostgreSQL, atualizando indicadores a cada 7 minutos. Vencedor do 1º Lugar VERA 2025.',
            tags: ['Django 6.0', 'Django-Ninja', 'Pydantic', 'HTMX', 'PostgreSQL', 'SAP / WAMAS'],
            link: null
        },
        {
            title: 'Automação ERP TOTVS Protheus & One-Page Dashboards C-Level',
            sector: 'VAREJO & HOME CENTER · CARAJÁS HOME CENTER',
            category: 'automacao',
            result: '-90% tempo de análise (8h → 50m)',
            description: 'Rotinas automatizadas em Python RPA e pipelines SQL / Power Query integrados ao ERP TOTVS Protheus para auditoria operacional e People Analytics.',
            pain: 'Extração manual lenta no TOTVS Protheus consumia ~8h diárias para auditar cortes, cancelamentos de pedidos e produtividade de headcount por turno.',
            solution: 'Robôs em Python e pipelines Power Query alimentando 4 One-Page Dashboards executivos em Power BI (incluindo preditivo de Black Friday), elevando em +25% a eficiência da equipe.',
            tags: ['Python RPA', 'TOTVS Protheus', 'Power BI', 'SQL', 'Power Query', 'People Analytics'],
            link: null
        },
        {
            title: 'Engenharia de Dados Financeiros & DRE Executivo',
            sector: 'SAÚDE & CLÍNICAS MÉDICAS · EYELASER CENTER',
            category: 'dados',
            result: '+20% eficiência · -15% tempo SLA',
            description: 'Modelagem financeira avançada em SQL, Power Query e DAX com componentes visuais HTML customizados para leitura executiva de DRE, Faturamento e Ticket Médio.',
            pain: 'Consolidação manual de indicadores clínicos e financeiros atrasava a análise de margem líquida e tomada de decisão da diretoria médica.',
            solution: 'Pipelines automatizados de BI e visuais HTML sob medida dentro do Power BI, aliados à gestão de alta disponibilidade (100% uptime em 1.000+ cirurgias oftalmológicas).',
            tags: ['Power BI', 'DAX Avançado', 'SQL', 'Power Query', 'HTML Custom', 'DRE Financeiro'],
            link: null
        },
        {
            title: 'Maestro + C3PO / R2D2 — Orquestrador Central de RPA (Medallion)',
            sector: 'ORQUESTRAÇÃO DE AUTOMAÇÕES · ARQUITETURA MEDALLION',
            category: 'automacao',
            result: 'Centralização REST · Redução de Infra',
            description: 'Orquestrador central de bots RPA via APIs REST (Python, Playwright, PyWinAuto) e servidor de ingestão em Robot Framework normalizando sistemas legados.',
            pain: 'Automações locais fragmentadas em múltiplas máquinas geravam falhas silenciosas, alto custo de manutenção e dados despadronizados.',
            solution: 'Arquitetura centralizada orientada a APIs REST com ingestão estruturada em camadas (Medallion Architecture), acelerando a criação de novos robôs sobre sistemas legados.',
            tags: ['Python', 'Playwright', 'PyWinAuto', 'Robot Framework', 'REST APIs', 'Medallion'],
            link: null
        },
        {
            title: 'Project Flow — Gestão Ágil & Matriz Esforço/Retorno',
            sector: 'SISTEMA CORPORATIVO SOB MEDIDA · DOCKER-FIRST',
            category: 'software',
            result: 'Padrão Corporativo · 100% Aderência',
            description: 'Aplicação web full-stack para priorização automática de demandas de engenharia, construída com Spec-Driven Development (SDD), DRF, Docker e HTMX.',
            pain: 'Demandas técnicas e operacionais dispersas em planilhas sem critério matemático de priorização entre esforço técnico e retorno de negócio.',
            solution: 'Sistema web containerizado (Docker-first) com Django REST Framework e HTMX que calcula automaticamente a matriz esforço/retorno, adotado como ferramenta padrão corporativa.',
            tags: ['Django REST (DRF)', 'HTMX', 'Docker', 'Spec-Driven Dev', 'PostgreSQL'],
            link: null
        },
        {
            title: 'Velocidade de Entrega — Pipeline Faturamento SAP & Tableau',
            sector: 'AUTOMAÇÃO DE SLA & FATURAMENTO · SAP / TABLEAU',
            category: 'dados',
            result: 'SLA de 2 dias garantido',
            description: 'Pipelines automatizados em Python e VBS extraindo dados do SAP e alimentando painéis executivos no Tableau sem intervenção humana.',
            pain: 'Geração manual de relatórios de faturamento e expedição consumia horas da operação e colocava em risco o SLA contratual de 2 dias.',
            solution: 'Extração programada no SAP com transformação em Pandas e atualização direta no Tableau, garantindo visibilidade contínua e cumprimento rigoroso do SLA.',
            tags: ['Python', 'Pandas', 'SAP Scripting', 'VBS', 'Tableau'],
            link: 'projetos/Velocidade-de-Entrega.html'
        },
        {
            title: 'ERP Proprietário, Service Desk & Controle de Garantias',
            sector: 'SISTEMA WEB B2B SEM MENSALIDADE POR USUÁRIO · MACEIÓ TI',
            category: 'software',
            result: '9 Contratos B2B · +50% Base Clientes',
            description: 'Desenvolvimento full-stack do zero de sistema de gestão de chamados, SLAs e garantias em Python, Flask, PostgreSQL, HTML5, CSS3 e JavaScript.',
            pain: 'Softwares de mercado cobravam mensalidades caras por atendente e não possuíam o fluxo específico de rastreio de garantias de hardware e contratos B2B.',
            solution: 'Arquitetura web leve e dedicada em Python/Flask sobre PostgreSQL que sustentou o crescimento de 50% da carteira (150+ clientes B2C e 9 contratos B2B) em operação solo.',
            tags: ['Python', 'Flask', 'PostgreSQL', 'JavaScript', 'HTML5 / CSS3', 'ERP Custom'],
            link: null
        },
        {
            title: 'Integração Fiscal (CTe/MDFe) & Portal Web de Tracking de Cargas',
            sector: 'ENGENHARIA FISCAL & PORTAL DO CLIENTE · SUED EXPRESS (5 FILIAIS)',
            category: 'software',
            result: '+30% Uptime · -25% Tempo de Resolução',
            description: 'Arquitetura de emissores fiscais eletrônicos e desenvolvimento de portal web customer-facing integrado a bancos de dados TMS legados.',
            pain: 'Clientes precisavam acionar o suporte manualmente para saber o status de cargas, e falhas de servidor entre as 5 filiais travavam a emissão de CTe/MDFe.',
            solution: 'Portal web de rastreamento em tempo real conectado diretamente aos bancos legados do TMS, somado à modernização da infraestrutura distribuída das 5 filiais.',
            tags: ['Integração Fiscal CTe/MDFe', 'Web Tracking', 'SQL / TMS Legado', 'Alta Disponibilidade'],
            link: null
        },
        {
            title: 'HeadControl, Tarjex & EtiquetasLOSS — Suite Operacional',
            sector: 'AUTOMAÇÃO INDUSTRIAL & MONITORAMENTO REAL-TIME',
            category: 'automacao',
            result: 'Relatórios IHH Instantâneos · ZPL Auto',
            description: 'Ecossistema de apps web (Django, HTMX, Selenium, PyAutoGUI) para controle de IHH e tarjas, mais serviço desktop (PyQt6/Pandas) para impressão ZPL.',
            pain: 'Lentidão na geração de relatórios de produtividade (IHH), descontrole no fluxo de tarjas e atrasos na impressão manual de etiquetas de estoque.',
            solution: 'Aplicações reativas em Django + HTMX integradas via RPA e gerador desktop nativo em PyQt6 disparando código ZPL direto para impressoras térmicas industriais.',
            tags: ['Django', 'HTMX', 'Selenium / PyAutoGUI', 'PyQt6', 'Pandas', 'ZPL Barcode'],
            link: null
        }
    ];

    const grid    = document.getElementById('portfolio-grid');
    const filters = document.querySelectorAll('.filter-btn');

    function renderPortfolio(filter = 'all') {
        if (!grid) return;
        const items = filter === 'all'
            ? portfolioData
            : portfolioData.filter(p => p.category === filter);

        grid.innerHTML = '';

        items.forEach(item => {
            const card = document.createElement('article');
            card.className = 'case-card';

            const linkEl = item.link
                ? `<a href="${item.link}" class="case-link">Ver estudo técnico completo &rarr;</a>`
                : '';

            card.innerHTML = `
                <div>
                    <div class="case-sector">${item.sector}</div>
                    <h3>${item.title}</h3>
                    <div class="case-roi-highlight">${item.result}</div>
                    <div class="pain-solution-box">
                        <div class="pain-item">
                            <strong>Cenário Anterior (Gargalo)</strong>
                            ${item.pain}
                        </div>
                        <div class="solution-item">
                            <strong>Arquitetura Implementada</strong>
                            ${item.solution}
                        </div>
                    </div>
                </div>
                <div class="case-footer">
                    <div class="badge-list">
                        ${item.tags.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                    </div>
                    ${linkEl}
                </div>
            `;

            grid.appendChild(card);
        });
    }

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPortfolio(btn.dataset.filter);
        });
    });

    renderPortfolio();

    // =====================
    // TIMELINE DATA (TRAJETÓRIA DE ENGENHARIA)
    // =====================
    const experienceData = [
        {
            role: 'Senior Team Leader — IDEA (Control Tower)',
            company: 'Mercado Livre',
            period: 'Set 2026 — Atual · São Bernardo do Campo, SP (Remoto)',
            desc: 'Liderança de inteligência operacional em Torre de Controle e coordenação técnica cross-system no maior ecossistema de e-commerce e tecnologia logística da América Latina.'
        },
        {
            role: 'Full-Stack Software Engineer (Analista de Desenvolvimento de Sistemas 3)',
            company: 'TPC Logística Inteligente (Operação JSL / Natura)',
            period: 'Set 2024 — Set 2026 · 2 anos',
            desc: 'Modernização ponta a ponta da operação substituindo fluxos manuais por aplicações full-stack containerizadas (Django, FastAPI, HTMX, Docker), APIs assíncronas e pipelines Parquet/Medallion integrados ao SAP e Databricks. Autor do DockSafe (R$ 16,8M economizados) e coautor do EcoaLog/SmartSave (1º Lugar Prêmio VERA 2025 Natura).'
        },
        {
            role: 'Analista Sênior de Dados & RPA (Python / SQL / Power BI)',
            company: 'Carajás Home Center',
            period: 'Fev 2024 — Ago 2024 · Rio Largo, AL',
            desc: 'Desenvolvimento de robôs em Python e pipelines SQL/Power Query integrados diretamente ao ERP TOTVS Protheus. Reduziu em 90% o tempo de análise de ocorrências (de 8h para 50min/dia), entregou 4 One-Page Dashboards para a diretoria e elevou a eficiência da equipe em 25%.'
        },
        {
            role: 'Data Analyst, BI Developer & Systems Specialist',
            company: 'Eyelaser Center',
            period: 'Mar 2022 — Fev 2024 · 2 anos · Maceió, AL',
            desc: 'Engenharia de pipelines financeiros (SQL, Power Query, DAX) e componentes HTML customizados em Power BI para DRE, Faturamento e Ticket Médio (+20% eficiência operacional, -15% tempo de resolução). Garantiu 100% de disponibilidade tecnológica em mais de 1.000 cirurgias oftalmológicas.'
        },
        {
            role: 'Consultor B2B & Desenvolvedor Full-Stack (CNPJ Próprio)',
            company: 'Maceió TI',
            period: 'Mai 2020 — Mai 2026 · 6 anos · Maceió, AL',
            desc: 'Operação independente atendendo 9 contratos B2B e 150+ clientes. Projetou e construiu do zero um ERP e Service Desk proprietário em Python, Flask, PostgreSQL e JavaScript para controle de SLAs, chamados e garantias, além de arquiteturas Windows Server/AD e Disaster Recovery.'
        },
        {
            role: 'Gerente de TI — Integração Fiscal (CTe/MDFe) & Engenharia de Software',
            company: 'SUED Express (EPST)',
            period: 'Abr 2012 — Mai 2021 · 9 anos 2 meses · Maceió, AL',
            desc: 'Liderança da arquitetura distribuída de 5 filiais, implantação integral dos emissores fiscais CTe/MDFe e desenvolvimento full-stack de sistema web customer-facing para rastreamento de cargas em tempo real sobre bancos TMS legados (+30% disponibilidade, -25% tempo de resolução).'
        },
        {
            role: 'Coordenador de TI & Tech Lead Nível 3 (Escalação B2B)',
            company: 'Norvinco Indústria de Embalagem & I.Soluções Tecnologia',
            period: 'Jul 2010 — Abr 2012 · Maceió, AL',
            desc: 'Reestruturação de servidores e governança de indicadores com BSC e SWOT na indústria Norvinco (+50% eficiência computacional) e liderança técnica de escalação Nível 3 em contratos B2B na I.Soluções (-20% em lead time e retrabalho).'
        }
    ];

    const timeline = document.getElementById('timeline');
    if (timeline) {
        timeline.innerHTML = '';
        experienceData.forEach((job, i) => {
            const el = document.createElement('div');
            el.className = 'timeline-item reveal';
            el.style.setProperty('--delay', `${i * 0.06}s`);
            el.innerHTML = `
                <p class="timeline-item__period">${job.period}</p>
                <p class="timeline-item__role">${job.role}</p>
                <p class="timeline-item__company">${job.company}</p>
                <p class="timeline-item__desc">${job.desc}</p>
            `;
            timeline.appendChild(el);
            revealObserver.observe(el);
        });
    }

    // =====================
    // LEAD QUALIFICATION & BRIEFING GENERATOR (WORKANA / FREELANCER / B2B)
    // =====================
    const leadForm     = document.getElementById('b2b-lead-form');
    const btnCopy      = document.getElementById('btn-copy-briefing');
    const copyFeedback = document.getElementById('copy-feedback');

    function buildStructuredBriefing() {
        const name       = (document.getElementById('lead-name')?.value || '').trim();
        const company    = (document.getElementById('lead-company')?.value || '').trim();
        const channel    = document.getElementById('lead-channel')?.value || 'Workana (Escrow / Garantia)';
        const maturity   = document.getElementById('lead-maturity')?.value || 'Escopo definido — pronto para iniciar';
        const scope      = document.querySelector('input[name="scope"]:checked')?.value || 'Automação RPA / Integração ERP';
        const bottleneck = (document.getElementById('lead-bottleneck')?.value || '').trim();

        const text =
            `[BRIEFING TÉCNICO — PROJETO QUALIFICADO]\n` +
            `• Cliente / Responsável: ${name || 'Não informado'}\n` +
            `• Empresa / Segmento: ${company || 'Não informado'}\n` +
            `• Canal de Contratação: ${channel}\n` +
            `• Frente Técnica: ${scope}\n` +
            `• Maturidade / Urgência: ${maturity}\n\n` +
            `• Gargalo Operacional / Escopo Desejado:\n${bottleneck || 'A detalhar no alinhamento.'}\n\n` +
            `Solicito análise arquitetural e proposta dividida em milestones.`;

        return { name, company, channel, maturity, scope, bottleneck, text };
    }

    if (btnCopy) {
        btnCopy.addEventListener('click', async () => {
            const nameInput = document.getElementById('lead-name');
            const bottleneckInput = document.getElementById('lead-bottleneck');

            if (nameInput && !nameInput.value.trim()) {
                nameInput.focus();
                return;
            }
            if (bottleneckInput && !bottleneckInput.value.trim()) {
                bottleneckInput.focus();
                return;
            }

            const { text } = buildStructuredBriefing();

            try {
                await navigator.clipboard.writeText(text);
                if (copyFeedback) {
                    copyFeedback.textContent = '✓ Briefing técnico copiado! Cole diretamente no chat do Workana ou Freelancer.com.br.';
                    copyFeedback.classList.remove('hidden');
                    setTimeout(() => copyFeedback.classList.add('hidden'), 6000);
                }
            } catch (_) {
                // Fallback for older browsers
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                if (copyFeedback) {
                    copyFeedback.textContent = '✓ Briefing técnico copiado! Cole diretamente no chat do Workana ou Freelancer.com.br.';
                    copyFeedback.classList.remove('hidden');
                    setTimeout(() => copyFeedback.classList.add('hidden'), 6000);
                }
            }
        });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', e => {
            e.preventDefault();
            const { company, scope, channel, text } = buildStructuredBriefing();
            const subject = encodeURIComponent(`[${channel} - ${scope}] ${company || 'Novo Projeto'}`);
            const body    = encodeURIComponent(text);
            window.location.href = `mailto:pdcassiano@gmail.com?subject=${subject}&body=${body}`;
        });
    }

});
