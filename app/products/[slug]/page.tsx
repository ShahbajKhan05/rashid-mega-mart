import { Metadata } from "next";
import { Suspense } from "react";
import { products } from "../../components/data";
import ProductClient from "./ProductClient";

type Props = {
  params: Promise<{ slug: string }>;
};

// 🔥 STATIC PARAMS (Build time pe prerender)
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug || product.id,
  }));
}

// 🔥 DYNAMIC SEO METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  const productUrl = `https://rashidmegamart.com/products/${
    product.slug || product.id
  }`;

  return {
    title: `${product.name} - Buy Online at Best Price`,
    description:
      product.description ||
      `Buy ${product.name} online at Rashid Mega Mart. Best price and fast delivery in Rewa.`,
    alternates: {
      canonical: productUrl, // 🔥 MOST IMPORTANT FIX
    },
    openGraph: {
      title: `${product.name} | Rashid Mega Mart`,
      description: product.description || `Buy ${product.name} online.`,
      url: productUrl,
      type: "website",
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description || `Buy ${product.name} online.`,
      images: [product.image],
    },
  };
}

// 🔥 INNER COMPONENT
async function ProductPageContent({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug || p.id === slug);

  // ⚠️ aggregateRating HATAYA - fake reviewCount Google penalty deta hai
  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: [product.image],
        description:
          product.description || `Buy ${product.name} online at Rashid Mega Mart.`,
        sku: product.id,
        brand: {
          "@type": "Brand",
          name: "Rashid Mega Mart",
        },
        offers: {
          "@type": "Offer",
          url: `https://rashidmegamart.com/products/${product.slug || product.id}`,
          priceCurrency: "INR",
          price: product.price,
          itemCondition: "https://schema.org/NewCondition",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Rashid Mega Mart",
          },
        },
      }
    : null;

  // 🔥 Breadcrumb JSON-LD (Rich results me dikhta hai)
  const breadcrumbJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://rashidmegamart.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: "https://rashidmegamart.com/products",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `https://rashidmegamart.com/products/${
              product.slug || product.id
            }`,
          },
        ],
      }
    : null;

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <ProductClient />
    </>
  );
}

// 🔥 OUTER PAGE COMPONENT
export default function ProductPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FFFCF0]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#800020] border-t-transparent" />
        </div>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}