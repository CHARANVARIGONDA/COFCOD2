import React, { useState } from 'react';
import {
  MOCK_OPERATIONS_ORDERS,
  MOCK_STOCK_COMPONENTS,
  MOCK_EXCEPTIONS,
  CHARACTERS,
  KITS,
  CharacterEmblem,
} from '@cofoco/shared';
import type { OperationsOrder, StockComponent, ExceptionCase } from '@cofoco/shared';
import { Button } from '../../components/ui/Button/Button';
import styles from './AdminPage.module.css';

type StaffRole = 'warehouse' | 'inventory' | 'finance' | 'brand_editor' | 'publisher' | 'admin';
type TabKey = 'orders' | 'inventory' | 'exceptions' | 'catalog';

export const AdminPage: React.FC = () => {
  // Staff Role & Auth State (PDF Page 7 Role Hierarchy)
  const [activeRole, setActiveRole] = useState<StaffRole>('warehouse');
  const [mfaVerified, setMfaVerified] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabKey>('orders');

  // Orders State (OP04 / US03)
  const [orders, setOrders] = useState<OperationsOrder[]>(MOCK_OPERATIONS_ORDERS);
  const [orderFilter, setOrderFilter] = useState<'all' | 'overdue' | 'paid' | 'picking' | 'packed' | 'dispatched'>('all');
  const [selectedOrder, setSelectedOrder] = useState<OperationsOrder | null>(orders[0]);
  const [trackingInput, setTrackingInput] = useState<string>('');
  const [auditNotice, setAuditNotice] = useState<string | null>(null);

  // Stock State (OP02)
  const [stockList, setStockList] = useState<StockComponent[]>(MOCK_STOCK_COMPONENTS);

  // Exceptions State (OP05)
  const [exceptions, setExceptions] = useState<ExceptionCase[]>(MOCK_EXCEPTIONS);

  const showAudit = (msg: string) => {
    setAuditNotice(msg);
    setTimeout(() => setAuditNotice(null), 4000);
  };

  const handleRecordStockReceipt = () => {
    setStockList((prev) =>
      prev.map((item) =>
        item.status !== 'healthy'
          ? { ...item, onHand: item.onHand + 20, available: item.available + 20, status: 'healthy' as const }
          : item
      )
    );
    showAudit('[AUDIT] Physical component shipment (+20 units per low SKU) recorded. Assembly capacity updated.');
  };

  const handleAdvanceStatus = (orderId: string, nextStatus: OperationsOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updated = { ...o, status: nextStatus };
          if (nextStatus === 'dispatched' && !updated.trackingNumber) {
            updated.trackingNumber = `CF-AIR-${Math.floor(100000 + Math.random() * 900000)}`;
          }
          if (selectedOrder?.id === orderId) setSelectedOrder(updated);
          return updated;
        }
        return o;
      })
    );
    showAudit(`[AUDIT] Order ${selectedOrder?.orderNumber} status transitioned to '${nextStatus.toUpperCase()}'. Automated customer notification sent.`);
  };

  const handleTogglePickItem = (orderId: string, sku: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedList = o.pickList.map((p) =>
            p.sku === sku ? { ...p, verified: !p.verified } : p
          );
          const updated = { ...o, pickList: updatedList };
          if (selectedOrder?.id === orderId) setSelectedOrder(updated);
          return updated;
        }
        return o;
      })
    );
  };

  const handleAssignTracking = (orderId: string) => {
    if (!trackingInput.trim()) return;
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updated = { ...o, trackingNumber: trackingInput.trim(), status: 'dispatched' as const };
          if (selectedOrder?.id === orderId) setSelectedOrder(updated);
          return updated;
        }
        return o;
      })
    );
    showAudit(`[AUDIT] Air courier AWB tracking '${trackingInput.trim()}' linked to ${selectedOrder?.orderNumber}. Customer dispatch SMS & Email triggered.`);
    setTrackingInput('');
  };

  const handleResolveException = (caseId: string) => {
    setExceptions((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status: 'resolved' as const } : c))
    );
    showAudit(`[AUDIT] Exception Case ${caseId} marked as RESOLVED by ${activeRole.toUpperCase()}. Inventory balance updated.`);
  };

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    if (orderFilter === 'overdue') return o.isOverdue;
    return o.status === orderFilter;
  });

  const allItemsVerified = selectedOrder ? selectedOrder.pickList.every((p) => p.verified) : false;

  return (
    <div className={styles.adminPage}>
      <div className="container">
        {/* Top Operational Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.badgeRow}>
              <span className={styles.systemBadge}>FULFILLMENT COMMAND CENTER</span>
              <span className={styles.serverStatus}>
                <span className={styles.statusDot} />
                BENGALURU WAREHOUSE DISPATCH // ASIA-SOUTH-1
              </span>
            </div>
            <h1 className={styles.pageTitle}>OPERATIONS & FULFILLMENT STATION</h1>
            <p className={styles.pageSubtitle}>
              Interactive order pick verification, component ledger allocations, and real-time shipping tracking (OP01–OP05).
            </p>
          </div>

          {/* Role & MFA Control Card */}
          <div className={styles.authCard}>
            <div className={styles.authRow}>
              <span className={styles.authLabel}>ACTIVE OPERATOR ROLE:</span>
              <select
                className={styles.roleSelect}
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value as StaffRole)}
                aria-label="Switch staff active role"
              >
                <option value="warehouse">Warehouse & Packing Lead</option>
                <option value="inventory">Inventory & BOM Controller</option>
                <option value="finance">Finance & Gateway Reconciler</option>
                <option value="brand_editor">Brand Editor (Drafts)</option>
                <option value="publisher">Authorized Publisher</option>
                <option value="admin">System Super Admin</option>
              </select>
            </div>
            <div className={styles.mfaRow}>
              <span className={styles.authLabel}>SECURITY ACCESS:</span>
              <button
                type="button"
                className={`${styles.mfaBtn} ${mfaVerified ? styles.mfaActive : ''}`}
                onClick={() => setMfaVerified(!mfaVerified)}
              >
                {mfaVerified ? '✓ HARDWARE TOTP VERIFIED' : '⚠ MFA REQUIRED'}
              </button>
            </div>
          </div>
        </header>

        {/* Audit Notification Banner */}
        {auditNotice && (
          <div className={styles.auditBanner}>
            <span className={styles.auditPulse}>●</span>
            <span>{auditNotice}</span>
          </div>
        )}

        {/* Workflow Tabs Navigation */}
        <nav className={styles.navTabs} aria-label="Operations sub-views">
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'orders' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <span>📦 ORDERS TO SHIP (OP04 / US03)</span>
            <span className={styles.tabBadge}>{orders.filter((o) => o.status !== 'delivered').length} ACTIVE</span>
          </button>

          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'inventory' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <span>⚙️ STOCK & COMPONENT LEDGER (OP02)</span>
            <span className={styles.tabBadge}>{stockList.filter((s) => s.status === 'low' || s.status === 'critical').length} REORDER ALERTS</span>
          </button>

          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'exceptions' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('exceptions')}
          >
            <span>⚠️ EXCEPTIONS & RETURNS (OP05)</span>
            <span className={styles.tabBadge}>{exceptions.filter((e) => e.status === 'open').length} CASES</span>
          </button>

          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'catalog' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <span>📝 CATALOG PUBLISHING (OP01 / US05)</span>
          </button>
        </nav>

        {/* TAB 1: ORDERS & FULFILLMENT QUEUE (OP04, US03) */}
        {activeTab === 'orders' && (
          <div className={styles.ordersLayout}>
            {/* Left Queue Column */}
            <div className={styles.ordersListCol}>
              <div className={styles.queueHeader}>
                <span className={styles.queueTitle}>ACTIVE DISPATCH QUEUE</span>
                <span className={styles.queueCount}>{filteredOrders.length} Orders</span>
              </div>

              <div className={styles.filterBar}>
                <button
                  type="button"
                  className={`${styles.filterPill} ${orderFilter === 'all' ? styles.filterActive : ''}`}
                  onClick={() => setOrderFilter('all')}
                >
                  ALL
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${styles.overduePill} ${orderFilter === 'overdue' ? styles.filterActive : ''}`}
                  onClick={() => setOrderFilter('overdue')}
                >
                  ⚠ OVERDUE ({orders.filter((o) => o.isOverdue).length})
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${orderFilter === 'paid' ? styles.filterActive : ''}`}
                  onClick={() => setOrderFilter('paid')}
                >
                  PAID
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${orderFilter === 'picking' ? styles.filterActive : ''}`}
                  onClick={() => setOrderFilter('picking')}
                >
                  PICKING
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${orderFilter === 'packed' ? styles.filterActive : ''}`}
                  onClick={() => setOrderFilter('packed')}
                >
                  PACKED
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${orderFilter === 'dispatched' ? styles.filterActive : ''}`}
                  onClick={() => setOrderFilter('dispatched')}
                >
                  DISPATCHED
                </button>
              </div>

              <div className={styles.orderCards}>
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className={`${styles.orderCard} ${selectedOrder?.id === ord.id ? styles.orderCardSelected : ''}`}
                    onClick={() => setSelectedOrder(ord)}
                  >
                    <div className={styles.orderCardHeader}>
                      <span className={styles.orderCardNum}>{ord.orderNumber}</span>
                      <span className={`${styles.statusBadge} ${styles[`status_${ord.status}`]}`}>
                        ● {ord.status.toUpperCase()}
                      </span>
                    </div>

                    <div className={styles.orderCustomer}>{ord.customerName} — {ord.city} ({ord.pincode})</div>
                    <div className={styles.orderKitName}>{ord.kitName}</div>

                    <div className={styles.orderCardFooter}>
                      <span className={ord.isOverdue ? styles.overdueText : styles.dateText}>
                        {ord.isOverdue ? '⚠ OVERDUE DISPATCH' : `Promised: ${ord.promisedDispatchDate.split(',')[0]}`}
                      </span>
                      <span className={styles.orderPrice}>₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Detailed Pick List & Workflow Inspector */}
            {selectedOrder && (
              <div className={styles.orderDetailCol}>
                {/* 4-Step Order Progression Timeline */}
                <div className={styles.stepperContainer}>
                  <div className={styles.stepperTrack}>
                    <div
                      className={`${styles.stepNode} ${['paid', 'picking', 'packed', 'dispatched', 'delivered'].includes(selectedOrder.status) ? styles.stepDone : ''}`}
                    >
                      <span className={styles.stepCircle}>1</span>
                      <span className={styles.stepTitle}>PAYMENT VERIFIED</span>
                    </div>

                    <div className={styles.stepLine} />

                    <div
                      className={`${styles.stepNode} ${['picking', 'packed', 'dispatched', 'delivered'].includes(selectedOrder.status) ? styles.stepDone : ''} ${selectedOrder.status === 'picking' ? styles.stepActive : ''}`}
                    >
                      <span className={styles.stepCircle}>2</span>
                      <span className={styles.stepTitle}>BOX PICKING</span>
                    </div>

                    <div className={styles.stepLine} />

                    <div
                      className={`${styles.stepNode} ${['packed', 'dispatched', 'delivered'].includes(selectedOrder.status) ? styles.stepDone : ''} ${selectedOrder.status === 'packed' ? styles.stepActive : ''}`}
                    >
                      <span className={styles.stepCircle}>3</span>
                      <span className={styles.stepTitle}>PACKED & SEALED</span>
                    </div>

                    <div className={styles.stepLine} />

                    <div
                      className={`${styles.stepNode} ${['dispatched', 'delivered'].includes(selectedOrder.status) ? styles.stepDone : ''} ${selectedOrder.status === 'dispatched' ? styles.stepActive : ''}`}
                    >
                      <span className={styles.stepCircle}>4</span>
                      <span className={styles.stepTitle}>AIR DISPATCHED</span>
                    </div>
                  </div>
                </div>

                {/* Plain-English Human Summary Banner */}
                <div className={styles.plainEnglishBanner}>
                  <div className={styles.bannerIcon}>📍</div>
                  <div className={styles.bannerText}>
                    <strong>Order destined for {selectedOrder.customerName} in {selectedOrder.city} ({selectedOrder.pincode}).</strong>
                    <span>
                      {selectedOrder.status === 'paid' && 'Waiting for warehouse packing team to start item pick list.'}
                      {selectedOrder.status === 'picking' && 'Warehouse operator verifying physical components before sealing.'}
                      {selectedOrder.status === 'packed' && 'Sealed in transport carton. Ready for BlueDart AWB assignment.'}
                      {selectedOrder.status === 'dispatched' && `In transit via Express Air. AWB: ${selectedOrder.trackingNumber}.`}
                      {selectedOrder.status === 'delivered' && 'Package confirmed delivered to customer doorstep.'}
                    </span>
                  </div>
                  <span className={`${styles.statusBadgeLarge} ${styles[`status_${selectedOrder.status}`]}`}>
                    {selectedOrder.status.toUpperCase()}
                  </span>
                </div>

                {/* Customer & Transit Manifest Card */}
                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>CUSTOMER DETAILS</span>
                    <span className={styles.metaValue}>{selectedOrder.customerName}</span>
                    <span className={styles.metaEmail}>{selectedOrder.customerEmail}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>DESTINATION PINCODE</span>
                    <span className={styles.metaValue}>{selectedOrder.city} — {selectedOrder.pincode}</span>
                    <span className={styles.metaEmail}>National Express Tier-1 Delivery</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>ASSIGNED FULFILLMENT LEAD</span>
                    <span className={styles.metaValue}>{selectedOrder.assignedOwner}</span>
                    <span className={styles.metaEmail}>Bengaluru Sanctuary Hub</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>AIR COURIER TRACKING (AWB)</span>
                    <span className={styles.metaValue}>{selectedOrder.trackingNumber || 'Awaiting Dispatch'}</span>
                    <span className={styles.metaEmail}>Prepaid: {selectedOrder.paymentMethod}</span>
                  </div>
                </div>

                {/* Purchased BOM Component Pick List (OP04) */}
                <div className={styles.bomSection}>
                  <div className={styles.bomSectionHeader}>
                    <div>
                      <h3 className={styles.bomTitle}>PHYSICAL COMPONENT PICK LIST (OP04)</h3>
                      <p className={styles.bomSubtitle}>
                        Click each item to verify that it is physically placed in the delivery box.
                      </p>
                    </div>
                    <span className={styles.verifiedCount}>
                      {selectedOrder.pickList.filter((p) => p.verified).length} OF {selectedOrder.pickList.length} ITEMS VERIFIED
                    </span>
                  </div>

                  <div className={styles.pickTable}>
                    {selectedOrder.pickList.map((item) => (
                      <div
                        key={item.sku}
                        className={`${styles.pickRow} ${item.verified ? styles.pickRowVerified : ''}`}
                        onClick={() => handleTogglePickItem(selectedOrder.id, item.sku)}
                      >
                        <div className={`${styles.pickCheckCircle} ${item.verified ? styles.checkActive : ''}`}>
                          {item.verified ? '✓' : '〇'}
                        </div>
                        <div className={styles.pickDetails}>
                          <div className={styles.pickItemName}>{item.item}</div>
                          <div className={styles.pickItemSpec}>Spec: {item.spec}</div>
                        </div>
                        <div className={styles.pickSkuBadge}>{item.sku}</div>
                        <div className={styles.pickQtyBadge}>QTY: {item.qty}</div>
                        <button type="button" className={item.verified ? styles.btnVerified : styles.btnVerify}>
                          {item.verified ? '✓ VERIFIED IN BOX' : 'CLICK TO VERIFY'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage Progression Buttons */}
                <div className={styles.workflowActions}>
                  <span className={styles.workflowLabel}>NEXT STEP IN FULFILLMENT PIPELINE:</span>
                  <div className={styles.actionBtnRow}>
                    {selectedOrder.status === 'paid' && (
                      <Button variant="primary" onClick={() => handleAdvanceStatus(selectedOrder.id, 'picking')}>
                        👉 START WAREHOUSE PICKING →
                      </Button>
                    )}
                    {selectedOrder.status === 'picking' && (
                      <Button
                        variant={allItemsVerified ? 'primary' : 'outline'}
                        onClick={() => handleAdvanceStatus(selectedOrder.id, 'packed')}
                        disabled={!allItemsVerified}
                      >
                        {allItemsVerified ? '✓ ALL ITEMS VERIFIED — SEAL & MARK AS PACKED →' : '⚠ VERIFY ALL ITEMS BEFORE PACKING'}
                      </Button>
                    )}
                    {selectedOrder.status === 'packed' && (
                      <div className={styles.dispatchRow}>
                        <input
                          type="text"
                          placeholder="Enter Air Courier AWB (e.g. BD-AIR-99201)"
                          value={trackingInput}
                          onChange={(e) => setTrackingInput(e.target.value)}
                          className={styles.trackingInput}
                        />
                        <Button variant="primary" onClick={() => handleAssignTracking(selectedOrder.id)}>
                          🚀 RECORD SHIPMENT & NOTIFY CUSTOMER →
                        </Button>
                      </div>
                    )}
                    {selectedOrder.status === 'dispatched' && (
                      <Button variant="outline" onClick={() => handleAdvanceStatus(selectedOrder.id, 'delivered')}>
                        🏠 MARK AS DELIVERED TO DOORSTEP ✓
                      </Button>
                    )}
                    {selectedOrder.status === 'delivered' && (
                      <span className={styles.deliveredCompleteText}>
                        ✓ ORDER LIFECYCLE COMPLETE — FULFILLED ACCURATELY
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: STOCK & ASSEMBLY LEDGER (OP02) */}
        {activeTab === 'inventory' && (
          <div className={styles.inventorySection}>
            <div className={styles.sectionTop}>
              <div>
                <h2 className={styles.sectionTitle}>COMPONENT INVENTORY & ASSEMBLY LEDGER (OP02)</h2>
                <p className={styles.sectionSubtitle}>
                  Sellable kit capacity is strictly constrained by the lowest whole number of components in stock:
                  <code>Available Kits = min(Component On-Hand ÷ BOM Requirement)</code>
                </p>
              </div>
              <Button variant="outline" onClick={handleRecordStockReceipt}>
                + RECORD INVENTORY SHIPMENT RECEIPT
              </Button>
            </div>

            <div className={styles.stockTableWrapper}>
              <table className={styles.stockTable}>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>COMPONENT DESCRIPTION</th>
                    <th>CATEGORY</th>
                    <th>ON HAND</th>
                    <th>RESERVED</th>
                    <th>SELLABLE AVAILABLE</th>
                    <th>UNIT COST</th>
                    <th>ASSOCIATED KITS</th>
                    <th>HEALTH STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {stockList.map((comp) => (
                    <tr key={comp.sku} className={comp.status === 'critical' ? styles.criticalRow : ''}>
                      <td className={styles.skuCell}>{comp.sku}</td>
                      <td className={styles.nameCell}><strong>{comp.name}</strong></td>
                      <td>{comp.category}</td>
                      <td className="tabular">{comp.onHand}</td>
                      <td className="tabular">{comp.reserved}</td>
                      <td className="tabular">
                        <strong className={comp.available <= 5 ? styles.lowStockNum : styles.healthyStockNum}>
                          {comp.available}
                        </strong>
                      </td>
                      <td className="tabular">₹{comp.unitCost}</td>
                      <td>
                        <span className={styles.kitPill}>{comp.associatedKits[0]}</span>
                      </td>
                      <td>
                        <span className={`${styles.healthBadge} ${styles[`health_${comp.status}`]}`}>
                          {comp.status === 'critical' ? '🔴 ZERO BUFFER' : comp.status === 'low' ? '🟡 REORDER ALERT' : '🟢 HEALTHY'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: EXCEPTIONS & RECONCILIATION (OP05, OP03) */}
        {activeTab === 'exceptions' && (
          <div className={styles.exceptionsSection}>
            <div className={styles.sectionTop}>
              <div>
                <h2 className={styles.sectionTitle}>EXCEPTION QUEUE & RECONCILIATION (OP05, OP03)</h2>
                <p className={styles.sectionSubtitle}>
                  Stock shortages, gateway payment mismatches, and returned units awaiting physical inspection.
                </p>
              </div>
            </div>

            <div className={styles.exceptionsGrid}>
              {exceptions.map((ex) => (
                <div key={ex.id} className={styles.exceptionCard}>
                  <div className={styles.exHeader}>
                    <span className={styles.exId}>{ex.id}</span>
                    <span className={`${styles.exBadge} ${styles[`ex_${ex.status}`]}`}>
                      {ex.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className={styles.exTitle}>
                    {ex.type === 'stock_shortage' && '⚠ Physical Stock Shortage'}
                    {ex.type === 'payment_mismatch' && '⚡ Late Gateway Webhook Capture'}
                    {ex.type === 'return_pending' && '📦 Returned Unit Inspection Pending'}
                  </h3>

                  <div className={styles.exOrder}>Order Reference: <strong>{ex.orderNumber}</strong> (₹{ex.amount.toLocaleString('en-IN')})</div>
                  <p className={styles.exNotes}>{ex.notes}</p>

                  <div className={styles.exFooter}>
                    <span className={styles.exOwner}>Assigned Owner: {ex.owner}</span>
                    {ex.status === 'open' && (
                      <Button variant="primary" onClick={() => handleResolveException(ex.id)}>
                        RESOLVE CASE ✓
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CATALOG & PUBLISHING (OP01, US05) */}
        {activeTab === 'catalog' && (
          <div className={styles.catalogSection}>
            <div className={styles.sectionTop}>
              <div>
                <h2 className={styles.sectionTitle}>CATALOG PUBLISHING & BOM REVISIONING (OP01, US05)</h2>
                <p className={styles.sectionSubtitle}>
                  Draft character collections and BOM versions. Only authorized publishers can approve production changes.
                </p>
              </div>
              <span className={styles.publisherBadge}>
                {activeRole === 'publisher' || activeRole === 'admin'
                  ? '✓ YOU HAVE PUBLISH PERMISSION'
                  : '⚠ READ-ONLY / DRAFT PERMISSION'}
              </span>
            </div>

            <div className={styles.catalogGrid}>
              {CHARACTERS.map((char) => (
                <div key={char.slug} className={styles.charCatalogCard}>
                  <div className={styles.charCatalogHeader}>
                    <CharacterEmblem characterSlug={char.slug} size={32} />
                    <div>
                      <h3 className={styles.charCatalogName}>{char.name}</h3>
                      <span className={styles.charCatalogTitle}>{char.title}</span>
                    </div>
                    <span className={styles.publishedPill}>PUBLISHED v1.2</span>
                  </div>

                  <div className={styles.kitListCatalog}>
                    <span className={styles.catalogLabel}>ATTACHED KITS & ACTIVE BOMS:</span>
                    {char.kitSlugs.map((slug) => {
                      const kit = KITS.find((k) => k.slug === slug);
                      return (
                        <div key={slug} className={styles.catalogKitRow}>
                          <span>{kit?.name || slug}</span>
                          <span className={styles.bomVersion}>BOM v{kit?.bom.length}.0 ({kit?.bom.length} items)</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles.catalogCardFooter}>
                    <a href={`/characters/${char.slug}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">PREVIEW PAGE ↗</Button>
                    </a>
                    {(activeRole === 'publisher' || activeRole === 'admin') && (
                      <Button variant="surface" onClick={() => showAudit(`[AUDIT] Collection '${char.name}' published by ${activeRole.toUpperCase()}. Static cache invalidated.`)}>
                        RE-PUBLISH
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
