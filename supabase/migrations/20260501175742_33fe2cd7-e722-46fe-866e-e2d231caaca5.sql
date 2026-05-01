-- Tabla para almacenar las órdenes pagadas que vienen del webhook de Shopify.
-- Es lectura pública porque la página de "gracias" la consulta por order_id sin autenticación
-- (el order_id es opaco y largo, funciona como token).
CREATE TABLE public.paid_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopify_order_id TEXT NOT NULL UNIQUE,
  order_number TEXT,
  email TEXT,
  customer_name TEXT,
  phone TEXT,
  total_price NUMERIC(12,2),
  currency TEXT,
  line_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  service_slugs TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  has_booking_service BOOLEAN NOT NULL DEFAULT false,
  has_form_service BOOLEAN NOT NULL DEFAULT false,
  raw_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_paid_orders_shopify_order_id ON public.paid_orders(shopify_order_id);
CREATE INDEX idx_paid_orders_email ON public.paid_orders(email);

ALTER TABLE public.paid_orders ENABLE ROW LEVEL SECURITY;

-- Lectura pública: cualquiera con el shopify_order_id (que es un número largo opaco) puede leer su orden
-- para ver el resumen de la compra. No exponemos raw_payload via lectura pública (el frontend no lo pide).
CREATE POLICY "Public can read paid orders by id"
ON public.paid_orders
FOR SELECT
USING (true);

-- Solo el service role (el edge function del webhook) puede insertar/actualizar.
-- No creamos policies de INSERT/UPDATE/DELETE para anon, así nadie puede falsificar órdenes desde el cliente.

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_paid_orders_updated_at
BEFORE UPDATE ON public.paid_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();